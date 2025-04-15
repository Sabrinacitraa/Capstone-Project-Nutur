const express = require(`express`)
const app = express()
app.use(express.json())
const bahasaController = require(`../controllers/bahasa-controller`)

app.get("/", bahasaController.getAllBahasa)
app.get("/:key", bahasaController.findBahasa)
app.post("/", bahasaController.addBahasa)
app.put("/:id", bahasaController.upadteBahasa)
app.delete("/:id", bahasaController.deleteBahasa)

module.exports = app