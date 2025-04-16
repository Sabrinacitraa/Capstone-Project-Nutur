const express = require(`express`)
const cors = require('cors');
const app = express()
app.use(cors());
//auth
const authRoute = require(`./routes/auth-route`)
app.use(`/login`, authRoute)

//user
const userRoute = require(`./routes/user-route`)
app.use(`/user`, userRoute)

//bahasa
const bahasaRoute = require(`./routes/bahasa-route`)
app.use(`/bahasa`, bahasaRoute)

//cerpen
const cerpenRoute = require(`./routes/cerpen-route`)
app.use(`/cerpen`, cerpenRoute)

//kelas
const kelasRoute = require(`./routes/kelas-route`)
app.use(`/kelas`, kelasRoute)

//modul
const modulRoute = require(`./routes/modul-route`)
app.use(`/modul`, modulRoute)

//progress
const progressRoute = require(`./routes/progress-route`)
app.use(`/progress`, progressRoute)

//testi
const testiRoute = require(`./routes/testi-route`)
app.use(`/testi`, testiRoute)

//port
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server of Nutur run on port ${PORT}`)
})