const { response, request } = require("express")
const mongoose = require("mongoose")
const Task = require("../models/Tarefas")

const getAll = (request, response, next) => {
    Task.find()
        .then((tasks) => {

            if (tasks == 0) {
                response.status(404).json({ message: 'there are no tasks, please POST one !' })
            }
            response.status(200).json(tasks);
        })
        .catch(err => next(err));
}

const criarTarefa = (request, response, next) => {
    let { descricao, nomeColaborador } = request.body

    const newTask = new Task({
        descricao,
        nomeColaborador,
    });

    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));
}

const atualizarTarefa = (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' })
        return;
    }

    Task.findById(id)
        .then((task) => {
            if (task.concluido == true) {
                return response.status(400).json({ message: 'Concluted tasks can not be updated' })
            }
            Task.findByIdAndUpdate(id, request.body)
                .then(() => {
                    response.status(200).json({ message: `${request.params.id} is updated` })

                })
                .catch((err) => {
                    response.json(err);
                })
        })
        .catch((error) => {
            response.json({ message: "Não pode atualizar tarefas concluidas" })
        })

}

const concluirTarefa = (request, response) => {
    const { id } = request.params
    const { concluido } = request.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' })
        return;
    }

    Task.findByIdAndUpdate(id, { $set: { concluido } })
        .then((task) => {
            if (task.concluido == true) {
                return response.status(400).json({ message: 'Concluted tasks can not be updated' })
            }
            response.status(200).json({ message: `${request.params.id} task is finished` })
        })
        .catch((err) => {
            response.json(err);
        })
}

const deletarTarefa = (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' })
        return;
    }

    Task.findById(id)
        .then((task) => {
            if (task.concluido == true) {
                return response.status(400).json({ message: 'Concluted tasks can not be deleted' })
            }
            Task.findByIdAndDelete(id)
                .then(() => {
                    response.status(200).json({ message: 'task deleted' })

                })
                .catch((err) => {
                    response.json(err);
                })
        })
        .catch((error) => {
            response.json(err)
        })

}

module.exports = {
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa

}