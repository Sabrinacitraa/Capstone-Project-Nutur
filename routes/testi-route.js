const express = require(`express`)
const app = express()
app.use(express.json())
const testiController = require('../controllers/testi-controller')
const { verifyToken } = require("../controllers/auth-controller");

app.post("/",verifyToken, testiController.addTestimoni)

module.exports = app