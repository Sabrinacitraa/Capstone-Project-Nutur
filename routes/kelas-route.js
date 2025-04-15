const express = require(`express`)
const app = express()
app.use(express.json())
const kelasController = require('../controllers/kelas-controller')

app.get("/", kelasController.getAllKelas)
app.get("/:key", kelasController.findKelas)
app.post("/", kelasController.addKelas)
app.put("/:id", kelasController.upadteKelas)
app.delete("/:id", kelasController.deleteKelas)

module.exports = app