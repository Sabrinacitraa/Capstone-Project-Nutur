const express = require(`express`)
const app = express()
app.use(express.json())
const progressController = require('../controllers/progress-controller')

app.get("/", progressController.getAllProgress)
app.post("/", progressController.addProgress)
app.get("/find", progressController.findProgress)


module.exports = app