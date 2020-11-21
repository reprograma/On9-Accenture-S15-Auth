const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    descricao: String,
    nomeColaborador: { type: String, required: true },
    hashPass: String
    },
    { timestamps: true });

const Tarefas = mongoose.model('Tarefas', userSchema);

module.exports = Tarefas;