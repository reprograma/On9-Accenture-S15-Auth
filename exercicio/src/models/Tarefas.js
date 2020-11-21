const mongoose = require("mongoose");
const { Schema } = mongoose;

const tarefaSchema = new Schema({
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, required: true },
}, { timestamps: true });

const Tarefas = mongoose.model('Tarefas', tarefaSchema);

module.exports = Tarefas;