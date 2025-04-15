const bahasaModel = require(`../models/index`).bahasa
const Op = require(`sequelize`).Op
const Joi = require(`joi`)

exports.getAllBahasa = async (req, res) => {
    let bahasa = await bahasaModel.findAll()
    if (bahasa.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing bahasa to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: bahasa,
            message: 'All bahasa has been loaded'
        })
    }
}

exports.findBahasa = async (req, res) => {
    let keyword = req.params.key
    let bahasa = await bahasaModel.findAll({
        where: {
            [Op.or]: [
                { BahasaID: { [Op.substring]: keyword } },
                { NamaBahasa: { [Op.substring]: keyword } },
                { Provinsi: { [Op.substring]: keyword } }
            ]
        }
    })
    if (bahasa.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing bahasa to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: bahasa,
            message: `All bahasa with key ${keyword} has been loaded`
        })
    }
}

exports.addBahasa = async (req, res) => {
    const schema = Joi.object({
        NamaBahasa: Joi.string().required().messages({
            'string.empty': 'Nama bahasa is required.',
            'any.required': 'Nama bahasa is required.',
        }),
        Provinsi: Joi.string().required().messages({
            'string.empty': 'Provinsi is required.',
            'any.required': 'Provinsi is required.',
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

    let newBahasa = {
        NamaBahasa: req.body.NamaBahasa,
        Provinsi: req.body.Provinsi
    }

    let checkDuplicate = await bahasaModel.findAll({
        where: { NamaBahasa: newBahasa.NamaBahasa },
    });
    if (checkDuplicate.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Bahasa already registered",
        });
    }

    bahasaModel.create(newBahasa)
        .then(result => {
            return res.status(200).json({
                success: true,
                data: newBahasa,
                message: `User with username ${newBahasa.NamaBahasa} has been inserted`
            })
        })
        .catch(error => {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        })
}

exports.upadteBahasa = async (req, res) => {
    let id = req.params.id
    const selectedBahasa = await bahasaModel.findOne({ where: { BahasaID: id } });
    if (!selectedBahasa) {
        return res.status(404).json({
            success: false,
            message: `Bahasa with id ${id} not found `,
        });
    }

    if (req.body.NamaBahasa) {
        const check = await bahasaModel.findOne({ where: { NamaBahasa: req.body.NamaBahasa } });
        if (check && check.BahasaID !== id) {
            return res.status(400).json({
                success: false,
                message: "NamaBahasa already exists",
            });
        }
    }

    let dataBahasa = {
        NamaBahasa: req.body.NamaBahasa || selectedBahasa.NamaBahasa,
        Provinsi: req.body.Provinsi || selectedBahasa.Provinsi
    }

    bahasaModel.update(dataBahasa, { where: { BahasaID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                data: dataBahasa,
                message: `Data bahasa with id ${id} has been updated`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteBahasa = async (req, res) => {
    let id = req.params.id
    const bahasa = await bahasaModel.findOne({ where: { BahasaID: id } });
    if (!bahasa) {
        return res.status(404).json({
            success: false,
            message: `bahasa not found with id: ${id}`,
        });
    }

    bahasaModel.destroy({ where: { BahasaID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                message: `Data bahasa with id ${id} has been deleted`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}