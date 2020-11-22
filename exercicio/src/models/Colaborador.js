const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  nome: { type: String, required: true },
  hashPass: String,
});

const Colaborador = mongoose.model("Colaborador", userSchema);

module.exports = Colaborador;
