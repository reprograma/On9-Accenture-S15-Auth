const express = require('express');
const app = express()


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ToDoList',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

//rotas
const toDoRoutes = require('./routes/toDoRoutes')

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use('/tarefas', toDoRoutes);


module.exports = app;