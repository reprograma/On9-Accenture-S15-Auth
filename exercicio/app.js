const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ToDoList', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const index = require("./routes/index")
const toDoRotas = require("./routes/toDoRoutes")
const sessions = require("./routes/sessionRoute")


app.use(express.json())

app.use("/", index)
app.use("/tarefas", toDoRotas)
app.use("/sessions", sessions)

module.exports = app




