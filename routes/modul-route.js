const express = require(`express`)
const app = express()
app.use(express.json())
const modulControler = require('../controllers/modul-controller')

app.get("/", modulControler.getAllModul)
app.get("/:key", modulControler.findModul)
app.post("/", modulControler.addModul)
app.put("/:id", modulControler.updateModul)
app.delete("/:id", modulControler.deleteModul)

module.exports = app