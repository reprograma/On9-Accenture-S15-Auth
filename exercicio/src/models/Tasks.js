const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, required: true },
    hashPass: String
},
    { timestamps: true });

const Tasks = mongoose.model('Tarefas', taskSchema)
module.exports = Tasks;