const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controllers/user-controller`)

app.get("/", userController.getAllUser)
app.get("/:key", userController.findUser)
app.post("/", userController.addUser)
app.put("/:id", userController.upadteUser)
app.delete("/:id", userController.deleteUser)
app.put('/reset/:id', userController.resetPassUser)
app.put('/passAdmin/:id', userController.resetPassAdmin)

module.exports = app