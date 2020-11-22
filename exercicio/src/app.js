const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reprograma', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//rotas

const index = require("./routes/index")
//const alunas = require("./routes/alunasRoute")
const taskRoutes = require("./routes/taskRoutes")
//const taskDoneRoutes = require("./routes/taskDoneRoutes")//
const sessions = require("./routes/sessionRoute")
const middleware = require("./middlewares/auth")

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
//app.use("/alunas", alunas)
app.use("/tasks", taskRoutes)
//app.use("/taskDone", taskDoneRoutes)
app.use("/sessions", sessions)




module.exports = app