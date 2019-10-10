const express = require("express")
const app = express()

//rotas
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')

app.all('*', function (req, res,next) {
    console.log('passamu pelo app, manooo!')
    next()
})

app.use("/", index)
app.use("/alunas", alunas)
module.exports = app