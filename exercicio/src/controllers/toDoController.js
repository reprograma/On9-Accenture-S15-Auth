const { response, request } = require("express")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Task = require('../models/Tarefas');
const bcryptSalt = 8

const getAll = (request, response)=>{
    Task.find()
    .then((tasks)=>{
        response.status(200).json(tasks);
    })
    .catch(err => next(err));
}

const getCompleted = (request,response)=>{
    Task.find({concluido: true})
        .then((tarefa)=>{
        response.status(200).json(tarefa);
    })
        .catch((err)=>{
        response.json(err);
    })
}

const getUncompleted = (request,response)=>{
    Task.find({concluido: false})
        .then((tarefa)=>{
        response.status(200).json(tarefa);
    })
        .catch((err)=>{
        response.json(err);
    })
}

const getId = (request, response)=>{
    const {id} = request.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({message: 'Specified id is not valid'});
        return;
    }
    Task.findById(id)
        .then((tarefa)=>{
            response.status(200).json(tarefa);
        })
        .catch((err)=>{
            response.json(err);
        })

}

const criarTarefa = async (request, response, next)=>{
    const { descricao, nomeColaborador, password } = request.body
    const salt = bcrypt.genSaltSync(bcryptSalt);
    try{
        const hashPass = await bcrypt.hashSync(password, salt);
    
        const newTask = new Task({
            descricao,
            nomeColaborador,
            hashPass
        });

        newTask.save()
            .then((tasks)=>{
                response.status(201).json(tasks);
            })
            .catch(err => next(err));
    } catch (e) {
        return response.status(401).json({error: 'erro'});
    }
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params 

    if({concluido:true}){
        response.status(200).json({message: `tarefa nao pode ser atualizada`});
        return;
    }
    Task.findByIdAndUpdate(id, request.body)
        .then(()=>{
            response.status(200).json({message: `${request.params.id} is updated successfuly.`});
        })
        .catch((err)=>{
            response.json(err);
        })
}

const concluirTarefa = (request, response)=>{
    const { id } = request.params
    const { concluido } = request.body
    if({concluido:true}){
        response.status(200).json({message: `tarefa nao pode ser atualizada`});
        return;
    }
    Task.findByIdAndUpdate(id, { $set: {concluido}})
        .then(()=>{
            response.status(200).json({message: `${request.params.id} is updated successfuly.`});
        })
        .catch((err)=>{
            response.json(err);
        })

}

const deletarTarefa = (request, response)=>{
    const { id } = request.params

    Task.findByIdAndDelete(id)
    .then(()=>{
        response.status(200).json('task deleted');
    })
    .catch((err)=>{
        throw new Error(err);
    });
}

module.exports ={
    getAll,
    getId,
    getCompleted,
    getUncompleted,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}
