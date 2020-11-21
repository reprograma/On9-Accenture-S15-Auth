const { response, request } = require("express")
const mongoose = require('mongoose')
const Task = require('../models/Tarefas')
const bcrypt = require('bcrypt')
const bcryptSalt = 8

//GET para mostrar todas as tarefas
const getAll = (request, response) => {
    Task.find()
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));
}


//GET mostrar tarefa pelo ID
const tarefaUnica = (request, response) => {
    const { id } = request.params
    Task.findById(id)
        .then((tasks) => {
            response.status(200).json(tasks)
        })
        .catch(err => next(err));
}

//GET mostrar tarefas concluidas
const tarefaConcluida = (request, response) => {

    Task.find({ concluido: true })
        .then((tasks) => {
            response.status(200).json(tasks)
        })
        .catch(err => next(err));
}

//GET mostrar tarefas não concluidas
const tarefaNaoConcluida = (request, response) => {

    Task.find({ concluido: false })
        .then((tasks) => {
            response.status(200).json(tasks)
        })
        .catch(err => next(err))
}

// POST criar nova tarefa
const criarTarefa = async (request, response, next) => {
    const { descricao, nomeColaborador, password } = request.body
    const salt = bcrypt.genSaltSync(bcryptSalt);

    try {
        const hashPass = await bcrypt.hashSync(password, salt);

        const newTask = new Task({
            descricao,
            nomeColaborador,
            hashPass
        });

        newTask.save()
            .then((tasks) => {
                response.status(201).json(tasks);
            })
            .catch(err => next(err));
    } catch (e) {
        return res.status(401).json({ error: 'erro' });
    }
}

// PUT atualizar toda tarefa
const atualizarTarefa = (request, response) => {
    const { id } = request.params // pega o ID na URL
    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Id informado não é válido' });
        return;
    }
    Task.findByIdAndUpdate(id, request.body)
        .then(() => {
            response.status(200).json({ message: ` ${request.params.id} atualizado com sucesso ` });
        })
        .catch((err) => {
            response.json(err)
        });
}

//PATCH atualizar concluido
const concluirTarefa = (request, response) => {
    const { id } = request.params // pegando o valor do ID que foi mandado na URL
    const { concluido } = request.body // pegando o valor de "concluido" enviado no body

    Task.findByIdAndUpdate(id, { $set: { concluido } })
        .then((task) => {
            response.status(200).json({ message: ` ${request.params.id} atualizado com sucesso ` });
        })
        .catch((err) => {
            response.json(err)
        });
}

//PATCH atualiza nome colaborador
const atualizarColaborador = (request, response) => {
    const { id } = request.params
    const { nomeColaborador } = request.body

    Task.findByIdAndUpdate(id, { $set: { nomeColaborador } })
        .then(() => {
            response.status(200).json({ message: ` ${request.params.id} atualizado com sucesso ` });
        })
        .catch((err) => {
            response.json(err)
        });
}

const deletarTarefa = (request, response) => {
    const { id } = request.params

    Task.findByIdAndDelete(id)
        .then(() => {
            response.status(200).json('tarefa deletada');
        })
        .catch((err) => {
            throw new Error(err);
        });
}

module.exports = {
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa,
    atualizarColaborador,
    tarefaUnica,
    tarefaConcluida,
    tarefaNaoConcluida
}