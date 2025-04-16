const md5 = require(`md5`)
const jwt = require(`jsonwebtoken`)
const userModel = require(`../models/index`).user
const secret = `mokleters`
const Joi = require(`joi`)

const authenticateToken = async (request, response) => {
    try {
        let dataLogin = {
            Email: request.body.Email,
            Password: md5(request.body.Password)
        }
        let dataUser = await userModel.findOne({
            where: dataLogin
        })
        if (dataUser) {
            let payload = JSON.stringify(dataUser)
            console.log(payload)
            let token = jwt.sign(payload, secret)
            return response.json({
                success: true,
                logged: true,
                message: `Login Success`,
                token: token,
                data: dataUser
            })
        }

        return response.json({
            success: false,
            logged: false,
            message: `Login Failed. Invalid username or password`
        })

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Simpan data user di request
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};



const register = async (req, res) => {
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
    });

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

    try {
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
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const authorize = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        let verifiedUser = jwt.verify(token, secret);
        if (!verifiedUser) {
            return response.json({
                success: false,
                auth: false,
                message: `User Unauthorized`
            })
        }

        request.user = verifiedUser;
        next();
    } else {
        return response.json({
            success: false,
            auth: false,
            message: `User Unauthorized`
        })
    }
}
module.exports = { authenticateToken, verifyToken, authorize, register }