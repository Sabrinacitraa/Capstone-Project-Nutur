const Joi = require("joi");
const testimoniModel = require("../models/index").testimoni;
const progressModel = require("../models/index").progressUser;

exports.addTestimoni = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found in token.",
            });
        }

        const schema = Joi.object({
            KelasID: Joi.number().integer().required().messages({
                "number.base": "KelasID must be a number.",
                "any.required": "KelasID is required.",
            }),
            Deskripsi: Joi.string().required().messages({
                "string.empty": "Deskripsi is required.",
                "any.required": "Deskripsi is required.",
            }),
        });

        const { error: validationError } = schema.validate(req.body);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError.details.map(err => err.message).join(", "),
            });
        }

        const { KelasID, Deskripsi } = req.body;
        const UserID = req.user.UserID;

        const progress = await progressModel.findOne({
            attributes: ['KelasID', 'UserID', 'Status'],
            where: { KelasID, UserID, Status: true },
        });

        if (!progress) {
            return res.status(400).json({
                success: false,
                message: "You can only add a testimonial if you have completed the class.",
            });
        }
        console.log("Checking existing testimonial for:", { KelasID, UserID });
        const existingTestimoni = await testimoniModel.findOne({
            where: { KelasID, UserID },
        });

        if (existingTestimoni) {
            return res.status(400).json({
                success: false,
                message: "You have already submitted a testimonial for this class.",
            });
        }

        const testimoni = await testimoniModel.create({
            KelasID,
            UserID,
            Deskripsi,
        });

        return res.status(201).json({
            success: true,
            data: testimoni,
            message: "Testimonial has been added successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};