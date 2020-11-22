const { response, request } = require("express")
const mongoose = require("mongoose");
const tarefa = require('../models/Tarefas')
const bcrypt = require("bcrypt");
const bcryptSalt = 12


const getAll = (Request, response) => {
    tarefa.find()
        .then(() => {
            response.status(200).json(Tarefas)
        })
        .catch(err => next(err));
}



const criarTarefa = async(request, response, next) =>{
     const { descricao, nomeColaborador, password } = request.body
     const salt = bcrypt.genSaltSync(bcryptSalt);
     try{
        const hashPass = await bcrypt.hashSync(password, salt);
     
     const novaTarefa = new Tarefa({
        descricao,
        nomeColaborador,
        hashPass
    });
    
    novaTarefa.save()
       .then((res) => {
           response.status(201).json(res);
       })
       .catch(err => next(err))
            return response.status(401).json({err: "erro"});
}



 const atualizarTarefa = (request, response) =>{
    const { id } = request.params 

    if({concluido: true}) {
        response.status(200).json({message: `tarefa não atualizada`})
        return;
    }
    Task.findByIdAndUpdate(id, Request.body)
        .then(() => {
            response.status(200).json({message: `${request.params.id} is updated successfully.`});
        })
        .catch((err) => {
            response.json(err);
        });
       
    }

    

const concluirTarefa = (request, response)=>{
    const { id } = request.params 
    const { concluido } = request.body 
    
    if({concluido:true}){
        response.status(400).json({message: `tarefa nao pode ser atualizada`})
        return;
    }
    tarefa.findByIdAndUpdate(id, { $set: {concluido}})
        .then(()=>{
            response.status(200).json({message: `${request.params.id} tarefa atualizada com sucesso.`});
        })
        .catch((err)=>{
            response.json(err);
        })

}

const deletarTarefa = (request, response)=>{
    const { id } = request.params

    tarefa.findByIdAndDelete(id)
        .then(() =>{
            response.status(200).json("Deletar tarefa");
        })
        .catch((err) => {
            throw new Error(err);
        });
    
        
}


module.exports = {
    getAll,
    criarTarefa,
    atualizarTarefa,
    concluirTarefa,
    deletarTarefa
};