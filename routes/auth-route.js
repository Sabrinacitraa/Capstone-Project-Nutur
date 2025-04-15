const express = require(`express`)
const app = express()
app.use(express.json())

const authController = require("../controllers/auth-controller")
app.post(`/`, authController.authenticateToken)


module.exports = app