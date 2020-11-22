const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ToDoList", {
  //define o nome da database que vai ser criada no Mongodb
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const index = require("./routes/index");
const toDoRotas = require("./routes/toDoRoutes");
const colaboradorRoutes = require("./routes/colaboradorRoutes");
const sessionRoutes = require("./routes/sessionRoute");
const middleware = require("./middlewares/auth");

app.use(express.json());

app.use("/", index);

app.use("/tarefas", middleware, toDoRotas);

app.use("/colaborador", colaboradorRoutes);
app.use("/login", sessionRoutes);

module.exports = app;
