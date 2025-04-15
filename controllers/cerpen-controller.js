const cerpenModel = require(`../models/index`).cerpen
const bahasaModel = require(`../models/index`).bahasa
const Op = require(`sequelize`).Op
const Joi = require(`joi`)
const upload = require(`./upload-audio`).single(`audio`);
const path = require(`path`);
const fs = require(`fs`);


exports.getAllCerpen = async (req, res) => {
    let cerpen = await cerpenModel.findAll()
    if (cerpen.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing cerpen to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: cerpen,
            message: 'All cerpen has been loaded'
        })
    }
}

exports.findCerpen = async (req, res) => {
    let keyword = req.params.key
    let cerpen = await cerpenModel.findAll({
        where: {
            [Op.or]: [
                { CerpenID: { [Op.substring]: keyword } },
                { Judul: { [Op.substring]: keyword } },
                { Penulis: { [Op.substring]: keyword } },
                { Provinsi: { [Op.substring]: keyword } },
                { TeksCerpen: { [Op.substring]: keyword } }
            ]
        }
    })
    if (cerpen.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing cerpen to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: cerpen,
            message: `All cerpen with key ${keyword} has been loaded`
        })
    }
}

exports.addCerpen = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error });
        }
        if (!req.file) {
            return res.status(400).json({
                message: `Audio Cerpen not found, Please upload!`,
            });
        }

        const schema = Joi.object({
            Judul: Joi.string().required().messages({
                'string.empty': 'Judul is required.',
                'any.required': 'Judul is required.',
            }),
            Penulis: Joi.string().required().messages({
                'string.empty': 'Penulis is required.',
                'any.required': 'Penulis is required.',
            }),
            Bahasa: Joi.string().required().messages({
                'string.empty': 'Bahasa is required.',
                'any.required': 'Bahasa is required.',
            }),
            TeksCerpen: Joi.string().required().messages({
                'string.empty': 'Text is required.',
                'string.min': 'Text must be at least 8 characters long.',
                'any.required': 'Text is required.',
            })
        })

        const { error: validationError } = schema.validate(req.body);
        if (validationError) {
            const errorMessages = validationError.details.map(err => err.message);
            const oldAudioCerpen = req.file.filename;
            const patchAudio = path.join(__dirname, `../audio-cerpen`, oldAudioCerpen);
            if (fs.existsSync(patchAudio)) {
                fs.unlink(patchAudio, (err) => console.log(err));
            }
            return res.status(400).json({
                success: false,
                message: errorMessages.join(', '),
            });
        }

        let newCerpen = {
            Judul: req.body.Judul,
            audio: req.file.filename,
            Penulis: req.body.Penulis,
            TeksCerpen: req.body.TeksCerpen,
            Bahasa: req.body.Bahasa
        };

        let cerpen = await cerpenModel.findAll({
            where: {
                Judul: newCerpen.Judul,
            },
        });

        if (cerpen.length > 0) {
            const oldAudioType = newCerpen.audio;
            const patchAudio = path.join(__dirname, `../audio-cerpen`, oldAudioType);

            if (fs.existsSync(patchAudio)) {
                fs.unlink(patchAudio, (error) => {
                    if (error) {
                        console.log(`Error deleting audio: ${error}`);
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: "Cerpen Title is already axist.",
            });
        }

        const bahasa = await bahasaModel.findOne({
            where: {
                NamaBahasa: {
                    [Op.substring]: newCerpen.Bahasa,
                },
            },
        });

        if (!bahasa) {
            return res.status(404).json({
                success: false,
                message: `Bahasa '${newCerpen.Bahasa}' not found.`,
            });
        }

        if (
            newCerpen.Judul === "" ||
            newCerpen.Penulis === "" ||
            newCerpen.Provinsi === "" ||
            newCerpen.TeksCerpen === "" ||
            newCerpen.Bahasa === ""
        ) {
            const oldAudioType = newCerpen.audio;
            const patchAudio = path.join(__dirname, `../audio-cerpen`, oldAudioType);

            if (fs.existsSync(patchAudio)) {
                fs.unlink(patchAudio, (error) => console.log(error));
            }

            return res.status(400).json({
                success: false,
                message: "Must be filled in all",
            });
        } else {
            let addCerpen = {
                Judul: req.body.Judul,
                audio: req.file.filename,
                Penulis: req.body.Penulis,
                Provinsi: bahasa.Provinsi,
                TeksCerpen: req.body.TeksCerpen,
                BahasaID: bahasa.BahasaID
            };

            console.log(addCerpen);
            cerpenModel.create(addCerpen)
                .then((result) => {
                    return res.json({
                        success: true,
                        data: result,
                        message: `New Cerpen has been inserted`,
                    });
                })
                .catch((error) => {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                });

        }
    });
};

exports.updateCerpen = async (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            return res.json({ message: error });
        }

        let id = req.params.id;
        const cekId = await cerpenModel.findOne({ where: { CerpenID: id } });
        if (!cekId) {
            return res.status(404).json({
                success: false,
                message: `Cerpen with id ${id} is not found.`,
            });
        }

        let newAudio = req.file ? req.file.filename : cekId.audio;
        let newCerpen = {
            Judul: req.body.Judul || cekId.Judul,
            audio: newAudio,
            Penulis: req.body.Penulis || cekId.Penulis,
            TeksCerpen: req.body.TeksCerpen || cekId.TeksCerpen,
            Bahasa: req.body.Bahasa || cekId.Bahasa
        };

        const existingCerpen = await cerpenModel.findOne({
            where: {
                Judul: newCerpen.Judul,
                CerpenID: { [Op.ne]: id },
            },
        });

        if (existingCerpen) {
            if (req.file) {
                const newAudioPath = path.join(__dirname, `../audio-cerpen`, newAudio);
                if (fs.existsSync(newAudioPath)) {
                    fs.unlinkSync(newAudioPath);
                }
            }

            return res.status(409).json({
                success: false,
                message: "Cerpen title already exists.",
            });
        }


        if (req.body.Bahasa) {
            const bahasa = await bahasaModel.findOne({
                where: { NamaBahasa: { [Op.substring]: req.body.Bahasa } },
            });

            if (!bahasa) {
                return res.status(404).json({
                    success: false,
                    message: `Bahasa '${req.body.Bahasa}' not found.`,
                });
            }
        }

        let oldAudio = cekId.audio;

        if (req.file) {
            newAudio = req.file.filename;
            newCerpen.audio = newAudio;
        } else {
            newCerpen.audio = cekId.audio;
        }

        cerpenModel.update(newCerpen, { where: { CerpenID: id } })
            .then(async (result) => {
                if (oldAudio && newAudio) {
                    const patchAudio = path.join(__dirname, `../audio-cerpen`, oldAudio);
                    if (fs.existsSync(patchAudio)) {
                        fs.unlink(patchAudio, (error) => {
                            if (error) {
                                console.log(`Error deleting audio: ${error}`);
                            }
                        });
                    }
                }
                return res.json({
                    success: true,
                    data: newCerpen,
                    message: `Cerpen with id ${id} has been updated`,
                });
            })
            .catch(async (error) => {
                if (newAudio) {
                    const patchAudio = path.join(__dirname, `../audio-cerpen`, newAudio);
                    if (fs.existsSync(patchAudio)) {
                        fs.unlink(patchAudio, (error) => {
                            if (error) {
                                console.log(`Error deleting audio: ${error}`);
                            }
                        });
                    }
                }
                return res.json({
                    success: false,
                    message: error.message,
                });
            });
    })
}

exports.deleteCerpen = async (req, res) => {
    try {
        const id = req.params.id;
        const cerpen = await cerpenModel.findOne({ where: { CerpenID: id } });
        if (!cerpen) {
            return res.status(404).json({
                success: false,
                message: `Cerpen with id ${id} not found.`,
            });
        }

        const audio = cerpen.audio;
        const pathAudio = path.join(__dirname, `../audio-cerpen`, audio);

        if (audio && fs.existsSync(pathAudio)) {
            fs.unlink(pathAudio, (error) => {
                if (error) {
                    console.log(`Error deleting audio: ${error}`);
                }
            });
        }

        await cerpenModel.destroy({ where: { CerpenID: id } });

        return res.status(200).json({
            success: true,
            message: `Cerpen with id ${id} has been deleted.`,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error.",
        });
    }
};