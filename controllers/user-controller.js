const userModel = require(`../models/index`).user
const md5 = require(`md5`)
const Op = require(`sequelize`).Op
const Joi = require(`joi`)


exports.getAllUser = async (req, res) => {
    let users = await userModel.findAll()
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing user to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: users,
            message: 'All users has been loaded'
        })
    }
}

exports.findUser = async (req, res) => {
    let keyword = req.params.key
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { UserID: { [Op.substring]: keyword } },
                { Username: { [Op.substring]: keyword } },
                { Email: { [Op.substring]: keyword } }
            ]
        }
    })
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Nothing user to show",
        });
    } else {
        return res.status(200).json({
            success: true,
            data: users,
            message: `All users with key ${keyword} has been loaded`
        })
    }
}

exports.addUser = async (req, res) => {
    const schema = Joi.object({
        Username: Joi.string().required().messages({
            'string.empty': 'Username is required.',
            'any.required': 'Username is required.',
        }),
        Email: Joi.string().email().required().messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.',
        }),
        Password: Joi.string().min(8).required().messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 8 characters long.',
            'any.required': 'Password is required.',
        }),
        Role: Joi.string().lowercase().valid('user', 'admin').required().messages({
            'string.empty': 'Role is required.',
            'any.required': 'Role is required.',
            'any.only': 'Choose User or Admin.',
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

    let newUser = {
        Username: req.body.Username,
        Email: req.body.Email,
        Password: md5(req.body.Password),
        Role: req.body.Role
    }

    let checkEmail = await userModel.findAll({
        where: { Email: newUser.Email },
    });
    if (checkEmail.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Email already registered",
        });
    }

    userModel.create(newUser)
        .then(result => {
            return res.status(200).json({
                success: true,
                data: newUser,
                message: `User with username ${newUser.Username} has been inserted`
            })
        })
        .catch(error => {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        })
}

exports.upadteUser = async (req, res) => {
    let id = req.params.id
    const selectedUser = await userModel.findOne({ where: { UserID: id } });
    if (!selectedUser) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found `,
        });
    }

    if (req.body.Username) {
        const check = await userModel.findOne({ where: { Username: req.body.Username } });
        if (check && check.UserID !== id) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }
    }

    const schema = Joi.object({
        Email: Joi.string().email().allow('').messages({
            'string.email': 'Email must be a valid email address.',
        }),
    }).unknown(true);

    const { error: validationError } = schema.validate(req.body);

    if (validationError) {
        const errorMessages = validationError.details.map(err => err.message);
        return res.status(400).json({
            success: false,
            message: errorMessages.join(', '),
        });
    }

    let newUser = {
        Username: req.body.Username || selectedUser.Username,
        Email: req.body.Email || selectedUser.Email,
        Role: req.body.Role || selectedUser.Role,
        Password: selectedUser.Password
    }

    userModel.update(newUser, { where: { UserID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                data: newUser,
                message: `Data user with id ${id} has been updated`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteUser = async (req, res) => {
    let id = req.params.id
    const user = await userModel.findOne({ where: { UserID: id } });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`,
        });
    }

    userModel.destroy({ where: { UserID: id } })
        .then(result => {
            return res.status(200).json({
                success: true,
                message: `Data user with id ${id} has been deleted`
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })
}

exports.resetPassUser = async (req, res) => {
    let id = req.params.id
    const user = await userModel.findOne({ where: { UserID: id } });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`,
        });
    }

    let dataUser = {
        Password: md5("nutur")
    };
    try {
        if (user.Role === "user") {
            await userModel.update(dataUser, { where: { UserID: id } });

            return res.json({
                success: true,
                message: `Password has been reset: nutur`
            });
        } else {
            return res.status(403).json({
                success: false,
                message: `User with id ${id} is not user.`
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

exports.resetPassAdmin = async (req, res) => {
    let id = req.params.id
    const user = await userModel.findOne({ where: { UserID: id } });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`,
        });
    }

    let dataUser = {
        Password: md5("adminNutur")
    };
    try {
        if (user.Role === "admin") {
            await userModel.update(dataUser, { where: { UserID: id } });

            return res.json({
                success: true,
                message: `Password has been reset: adminNutur`
            });
        } else {
            return res.status(403).json({
                success: false,
                message: `User with id ${id} is not admin.`
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}