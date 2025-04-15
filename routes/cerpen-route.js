const express = require(`express`)
const app = express()
app.use(express.json())
const cerpenController = require('../controllers/cerpen-controller')

app.get("/", cerpenController.getAllCerpen)
app.get("/:key", cerpenController.findCerpen)
app.post("/", cerpenController.addCerpen)
app.put("/:id", cerpenController.updateCerpen)
app.delete("/:id", cerpenController.deleteCerpen)

module.exports = app