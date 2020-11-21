const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nome: { type: String, required: true },
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, required: true },
    hashPass: String
});

const Tarefas = mongoose.model('Tarefas', userSchema);

module.exports = Tarefas;




