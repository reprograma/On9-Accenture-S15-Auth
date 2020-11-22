
const { response, request } = require("express")
const mongoose = require('mongoose');
const Task = require('../model/Tarefa');
const bcrypt = require('bcrypt');
const bcryptSalt = 8;

exports.getAll = (request, response)=>{
    Task.find()
    .then((tasks) => {
        response.status(200).json(tasks);
    })
    .catch(err => next(err));
}

exports.getConcluida = (request, response) => {
    Task.find({ concluido: true })
        .then((tasks) => {
             response.status(200).json(tasks);        
        })
        .catch((err) => {
            response.json(err);
    })
}

exports.getNaoConcluida = (request, response) => {
    Task.find({ concluido: false })
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch((err) => {
            next(err);
    })
}

exports.getById = (request, response) => {
    const { id } = request.params
    Task.findById(id)
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));
}

exports.criarTarefa = async (request, response, next) => {
    let { descricao, nomeColaborador, password } = request.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    try {
        const hashPass = await bcrypt.hashSync(password, salt);

        const newTask = new Task({
            descricao,
            nomeColaborador,
            hashPass
        });
        newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));
    } catch (e) {
        return response.status(401).json({ error: 'erro' });
    }  
}

exports.atualizarTarefa = (request, response) =>{
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid.' });
        return;
    }
    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `
                Unable to update completed tasks.` });
            } else {
                Task.findByIdAndUpdate(id, request.body)
                    .then(() => {
                        response.status(200).json({ message: `${request.params.id} is updated successfully.` });
                    })
                    .catch((err) => {
                        response.json(err);
                    });    
            }
        })
        .catch((err) => {
            response.json(err);
        });  
}

exports.concluirTarefa = (request, response)=>{
    const { id } = request.params
    const { concluido } = request.body

    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `The task cannot be completed.` });
            } else {
                Task.findByIdAndUpdate(id, { $set: { concluido }})
                    .then((task) => {
                        response.status(200).json({ message: `${request.params.id} task is finished.` });
                    })
                    .catch((err) => {
                        response.json(err);
                    });
            }
        })
        .catch((err) => {
            response.json(err);
        });  
}

exports.atualizarColaborador = (request, response) => {
    const { id } = request.params
    const { nomeColaborador } = request.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `It is not possible to update the responsible, as this task has already been completed.` });
            } else {
                Task.findByIdAndUpdate(id, { $set: { nomeColaborador }})
                    .then(() => {
                        response.status(200).json({ message: `${request.params.id} is updated successfully.` });
                    })
                    .catch((err) => {
                        response.json(err);
                    });    
            }
        })
        .catch((err) => {
            response.json(err);
        });
}

exports.deletarTarefa = (request, response)=>{
    const { id } = request.params

    Task.findById(id)
    .then((task) => {
        if(task.concluido == true) {
            response.status(200).json({ message: `Unable to delete completed tasks.` });
        } else {
            Task.findByIdAndDelete(id)
                .then(() => {
                    response.status(200).json({ message: `Task deleted.` });
                })
                .catch((err) => {
                    throw new Error(err);
                });    
        }
    })
    .catch((err) => {
        response.json(err);
    });
}