const md5 = require(`md5`)
const jwt = require(`jsonwebtoken`)
const userModel = require(`../models/index`).user
const secret = `mokleters`

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



exports.register = async (req, res) => {
    const schema = Joi.object({
        Username: Joi.string().required(),
        Email: Joi.string().email().required(),
        Password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { Username, Email, Password } = req.body;

    try {
        const existingUser = await userModel.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = bcrypt.hashSync(Password, 10);

        const newUser = await userModel.create({ Username, Email, Password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser,
        });
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
module.exports = { authenticateToken, verifyToken, authorize }