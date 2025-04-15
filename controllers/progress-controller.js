const modulModel = require(`../models/index`).modul
const kelasModel = require(`../models/index`).kelas
const userModel = require(`../models/index`).user
const progressModel = require(`../models/index`).progressUser
const Op = require(`sequelize`).Op
const Joi = require(`joi`)

exports.getAllProgress = async (req, res) => {
    let progress = await progressModel.findAll()
    if (progress.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing Progress to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: progress,
            message: 'All Progress has been loaded'
        })
    }
}

exports.addProgress = async (req, res) => {
    const schema = Joi.object({
        UserID: Joi.string().required().messages({
            'string.empty': 'UserID is required.',
            'any.required': 'UserID is required.',
        }),
        KelasID: Joi.string().required().messages({
            'string.empty': 'KelasID is required.',
            'any.required': 'KelasID is required.',
        }),
        ModulDone: Joi.number().integer().min(1).required().messages({
            'number.base': 'ModulDone must be a number.',
            'number.min': 'ModulDone must be at least 1.',
            'any.required': 'ModulDone is required.',
        }),
    });

    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError.details.map(err => err.message).join(', '),
        });
    }

    const { UserID, KelasID, ModulDone } = req.body;

    try {
        const existingProgress = await progressModel.findOne({
            where: { UserID, KelasID, Status: true }
        });

        if (existingProgress) {
            return res.status(400).json({
                success: false,
                message: `You have already completed all modules in this class. No more progress can be added.`,
            });
        }

        const kelas = await kelasModel.findOne({ where: { KelasID } });
        if (!kelas) {
            return res.status(404).json({
                success: false,
                message: `Class with ID '${KelasID}' not found.`,
            });
        }

        const existingModules = await progressModel.findAll({
            where: { UserID, KelasID },
            attributes: ['ModulID']
        });
        const completedModuleIDs = existingModules.map(modul => modul.ModulID);

        const modulList = await modulModel.findAll({
            where: { 
                KelasID,
                ModulID: { [Op.notIn]: completedModuleIDs }
            },
            order: [['ModulID', 'ASC']],
            attributes: ['ModulID'],
            limit: ModulDone
        });

        if (modulList.length === 0) {
            return res.status(400).json({
                success: false,
                message: `All available modules for KelasID '${KelasID}' are already completed.`,
            });
        }

        const totalModulInClass = await modulModel.count({ where: { KelasID } });

        if (ModulDone > modulList.length) {
            return res.status(400).json({
                success: false,
                message: `You are trying to complete more modules (${ModulDone}) than available (${modulList.length}).`,
            });
        }

        const progressPerModul = 100 / totalModulInClass;
        const totalProgress = (existingModules.length + ModulDone) * progressPerModul;

        const progressData = modulList.map(modul => ({
            UserID,
            ModulID: modul.ModulID,
            KelasID,
            ProgressPersen: `${progressPerModul}%`,
            Status: false
        }));

        await progressModel.bulkCreate(progressData);

        const totalCompletedModules = await progressModel.count({
            where: { UserID, KelasID }
        });

        const isCompleted = totalCompletedModules >= totalModulInClass;
        if (isCompleted) {
            await progressModel.update(
                { Status: true },
                { where: { UserID, KelasID } }
            );
        }

        return res.status(201).json({
            success: true,
            data: {
                UserID,
                KelasID,
                ModulDone,
                ProgressPersen: `${totalProgress}%`,
                Status: isCompleted
            },
            message: `Progress for UserID '${UserID}' on KelasID '${KelasID}' has been updated.`,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.findProgress = async (req, res) => {
    const schema = Joi.object({
        UserID: Joi.string().allow("").optional(),
        KelasID: Joi.string().allow("").optional(),
        ModulID: Joi.string().allow("").optional(),
        Status: Joi.alternatives().try(Joi.boolean(), Joi.string().allow("")).optional() 
    });    

    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError.details.map(err => err.message).join(', '),
        });
    }

    const { UserID, KelasID, ModulID, Status } = req.body;

    try {
        const filter = {};
        if (UserID) filter.UserID = UserID;
        if (KelasID) filter.KelasID = KelasID;
        if (ModulID) filter.ModulID = ModulID;
        if (Status !== undefined && Status !== "") filter.Status = Status;

        if (Object.keys(filter).length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one search parameter (UserID, KelasID, ModulID, or Status) must be provided."
            });
        }

        const progressData = await progressModel.findAll({ where: filter });

        if (progressData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No progress found with the given criteria.",
            });
        }

        return res.status(200).json({
            success: true,
            data: progressData,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
