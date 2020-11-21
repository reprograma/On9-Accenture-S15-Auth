const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/ToDoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const toDoRotas = require("./routes/toDoRoutes")
const user = require("./routes/userRoute")
const sessions = require("./routes/sessionRoute")

app.use(express.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/tarefas", toDoRotas)
app.use("/users", user)
app.use("/sessions", sessions)

module.exports = app