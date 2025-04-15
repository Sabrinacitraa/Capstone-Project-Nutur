const kelasModel = require(`../models/index`).kelas
const modulModel = require(`../models/index`).modul
const Op = require(`sequelize`).Op
const Joi = require(`joi`)

exports.getAllModul = async (req, res) => {
    let modul = await modulModel.findAll()
    if (modul.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing modul to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: modul,
            message: 'All modul has been loaded'
        })
    }
}

exports.findModul = async (req, res) => {
    let keyword = req.params.key
    let modul = await modulModel.findAll({
        where: {
            [Op.or]: [
                { ModulID: { [Op.substring]: keyword } },
                { JudulModul: { [Op.substring]: keyword } },
                { Deskripsi: { [Op.substring]: keyword } }
            ]
        }
    })
    if (modul.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing modul to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: modul,
            message: `All modul with key ${keyword} has been loaded`
        })
    }
}

exports.addModul = async (req, res) => {
    const schema = Joi.object({
        JudulModul: Joi.string().required().messages({
            'string.empty': 'JudulModul is required.',
            'any.required': 'JudulModul is required.',
        }),
        Deskripsi: Joi.string().required().messages({
            'string.empty': 'Deskripsi is required.',
            'any.required': 'Deskripsi is required.',
        }),
        KelasID: Joi.string().required().messages({
            'string.empty': 'Bahasa is required.',
            'any.required': 'Bahasa is required.',
        })
    })
    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
        const errorMessages = validationError.details.map(err => err.message);
        return res.status(400).json({
            success: false,
            message: errorMessages.join(', '),
        });
    }

    let newModul = {
        JudulModul: req.body.JudulModul,
        Deskripsi: req.body.Deskripsi,
        KelasID: req.body.KelasID,
    }

    let check = await modulModel.findAll({
        where: { JudulModul: newModul.JudulModul },
    });
    if (check.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Title already exist",
        });
    }

    const kelas = await kelasModel.findOne({
        where: { KelasID: newModul.KelasID }
    });

    if (!kelas) {
        return res.status(404).json({
            success: false,
            message: `Class with ID '${newModul.KelasID}' not found.`,
        });
    }


    let addModul = {
        JudulModul: newModul.JudulModul,
        Deskripsi: newModul.Deskripsi,
        KelasID: kelas.KelasID
    }

    modulModel.create(addModul)
        .then(result => {
            return res.status(200).json({
                success: true,
                data: result,
                message: `Modul with title ${addModul.JudulModul} has been inserted`
            })
        })
        .catch(error => {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        })
}

exports.updateModul = async (req, res) => {
    let id = req.params.id
    const selectedModul = await modulModel.findOne({ where: { ModulID: id } });
    if (!selectedModul) {
        return res.status(404).json({
            success: false,
            message: `Modul with id ${id} not found `,
        });
    }

    let newJudulModul = req.body.JudulModul || selectedModul.JudulModul;
    let newDeskripsi = req.body.Deskripsi || selectedModul.Deskripsi;
    let newKelasID = req.body.KelasID || selectedModul.KelasID;

    if (req.body.JudulModul && req.body.JudulModul !== selectedModul.JudulModul) {
        let check = await modulModel.findOne({ where: { JudulModul: req.body.JudulModul } });
        if (check) {
            return res.status(400).json({
                success: false,
                message: "Title already exists.",
            });
        }
    }

    if (req.body.KelasID) {
        const kelas = await kelasModel.findOne({ where: { KelasID: req.body.KelasID } });

        if (!kelas) {
            return res.status(404).json({
                success: false,
                message: `Class with ID '${req.body.KelasID}' not found.`,
            });
        }
        newKelasID = kelas.KelasID;
    }

    let updateModul = {
        JudulModul: newJudulModul,
        Deskripsi: newDeskripsi,
        KelasID: newKelasID,
    };

    modulModel.update(updateModul, { where: { ModulID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                data: updateModul,
                message: `Class with id ${id} has been updated`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteModul = async (req, res) => {
    let id = req.params.id
    const modul = await modulModel.findOne({ where: { ModulID: id } });
    if (!modul) {
        return res.status(404).json({
            success: false,
            message: `Modul not found with id: ${id}`,
        });
    }

    modulModel.destroy({ where: { ModulID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                message: `Modul with id ${id} has been deleted`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}