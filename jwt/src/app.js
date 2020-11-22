const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ToDoList', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//rotas
const index = require("./routes/index")
const tarefa = require("./routes/tarefaRoute")
const sessions = require("./routes/sessionRoute")


app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use("/", index)
app.use("/tarefa", tarefa)
app.use("/sessions", sessions)

module.exports = app
