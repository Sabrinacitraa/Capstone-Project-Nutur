const kelasModel = require(`../models/index`).kelas
const bahasaModel = require(`../models/index`).bahasa
const userModel = require(`../models/index`).user
const Op = require(`sequelize`).Op
const Joi = require(`joi`)

exports.getAllKelas = async (req, res) => {
    let kelas = await kelasModel.findAll()
    if (kelas.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing class to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: kelas,
            message: 'All class has been loaded'
        })
    }
}

exports.findKelas = async (req, res) => {
    let keyword = req.params.key
    let kelas = await kelasModel.findAll({
        where: {
            [Op.or]: [
                { KelasID: { [Op.substring]: keyword } },
                { JudulKelas: { [Op.substring]: keyword } },
                { Deskripsi: { [Op.substring]: keyword } }
            ]
        }
    })
    if (kelas.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing class to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: kelas,
            message: `All class with key ${keyword} has been loaded`
        })
    }
}

exports.addKelas = async (req, res) => {
    const schema = Joi.object({
        JudulKelas: Joi.string().required().messages({
            'string.empty': 'JudulKelas is required.',
            'any.required': 'JudulKelas is required.',
        }),
        Deskripsi: Joi.string().required().messages({
            'string.empty': 'Deskripsi is required.',
            'any.required': 'Deskripsi is required.',
        }),
        Bahasa: Joi.string().required().messages({
            'string.empty': 'Bahasa is required.',
            'any.required': 'Bahasa is required.',
        }),
        Username: Joi.string().required().messages({
            'string.empty': 'Username is required.',
            'any.required': 'Username is required.',
        }),
    })
    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
        const errorMessages = validationError.details.map(err => err.message);
        return res.status(400).json({
            success: false,
            message: errorMessages.join(', '),
        });
    }

    let newKelas = {
        JudulKelas: req.body.JudulKelas,
        Deskripsi: req.body.Deskripsi,
        Bahasa: req.body.Bahasa,
        Username: req.body.Username
    }

    let check = await kelasModel.findAll({
        where: { JudulKelas: newKelas.JudulKelas },
    });
    if (check.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Title already exist",
        });
    }

    const bahasa = await bahasaModel.findOne({
        where: {
            NamaBahasa: {
                [Op.substring]: newKelas.Bahasa,
            }
        }
    })
    if (!bahasa) {
        return res.status(404).json({
            success: false,
            message: `Bahasa '${newKelas.Bahasa}' not found.`,
        });
    }

    const user = await userModel.findOne({
        where: {
            Username: {
                [Op.substring]: newKelas.Username,
            },
            Role: "admin"
        }
    })
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `Username'${newKelas.Username}' not found or not admin.`,
        });
    }

    let addKelas = {
        JudulKelas: newKelas.JudulKelas,
        Deskripsi: newKelas.Deskripsi,
        BahasaID: bahasa.BahasaID,
        UserID: user.UserID
    }

    kelasModel.create(addKelas)
        .then(result => {
            return res.status(200).json({
                success: true,
                data: result,
                message: `Class with title ${addKelas.JudulKelas} has been inserted`
            })
        })
        .catch(error => {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        })
}

exports.upadteKelas = async (req, res) => {
    let id = req.params.id
    const selectedKelas = await kelasModel.findOne({ where: { KelasID: id } });
    if (!selectedKelas) {
        return res.status(404).json({
            success: false,
            message: `Class with id ${id} not found `,
        });
    }

    let newKelas = {
        JudulKelas: req.body.JudulKelas,
        Deskripsi: req.body.Deskripsi,
        Bahasa: req.body.Bahasa,
        Username: req.body.Username
    }

    let check = await kelasModel.findAll({
        where: { JudulKelas: newKelas.JudulKelas },
    });
    if (check.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Title already exist",
        });
    }

    let bahasaID = selectedKelas.BahasaID;
    if (req.body.Bahasa) {
        const bahasa = await bahasaModel.findOne({
            where: { NamaBahasa: { [Op.substring]: req.body.Bahasa } }
        });

        if (!bahasa) {
            return res.status(404).json({
                success: false,
                message: `Bahasa '${req.body.Bahasa}' not found.`,
            });
        }
        bahasaID = bahasa.BahasaID;
    }


    let userID = selectedKelas.UserID;
    if (req.body.Username) {
        const user = await userModel.findOne({
            where: {
                Username: { [Op.substring]: req.body.Username },
                Role: "admin"
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Username '${req.body.Username}' not found or not admin.`,
            });
        }
        userID = user.UserID;
    }


    let updateKelas = {
        JudulKelas: newKelas.JudulKelas || selectedKelas.JudulKelas,
        Deskripsi: newKelas.Deskripsi || selectedKelas.Deskripsi,
        BahasaID: bahasaID,
        UserID: userID 
    }

    kelasModel.update(updateKelas, { where: { KelasID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                data: updateKelas,
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

exports.deleteKelas = async (req, res) => {
    let id = req.params.id
    const kelas = await kelasModel.findOne({ where: { KelasID: id } });
    if (!kelas) {
        return res.status(404).json({
            success: false,
            message: `Class not found with id: ${id}`,
        });
    }

    kelasModel.destroy({ where: { KelasID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                message: `Class with id ${id} has been deleted`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}