const express = require('express');
const app = express()


//conexão com o nosso banco de dados
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ToDoList',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


//rotas
const toDoRoutes = require('./routes/toDoRoutes');
const sessions = require('./routes/sessionRoutes')

app.use(express.json());


//Nossa função fazendo o papel do cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use('/tarefas', toDoRoutes);
app.use('/sessions', sessions);


module.exports = app;