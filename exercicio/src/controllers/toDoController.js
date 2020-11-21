const Task = require('../models/Tasks');
const mongoose = require('mongoose')
const { taskSchema } = require('../validators/task')
const bcrypt = require('bcrypt');

/*   GET   */
const getAllTasks = (request, response) => {
    Task.find()
        .then((res) => { response.status(200).json(res) })
        .catch(err => next(err));
}
const getFinishedTasks = (request, response) => {
    Task.find({ concluido: true })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getUnfinishedTasks = (request, response) => {
    Task.find({ concluido: false })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getByID = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => { response.status(200).json(task) })
        .catch(err => console.log(err));
}


/*   POST   */
const createTask = async (request, response) => {
    try {
        const validatedTask = await taskSchema.validate(request.body)

        //Salteando e hasheando a senha que vai ser passada pelo body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(validatedTask.password, salt)

        const newTask = new Task({
            descricao: validatedTask.descricao,
            nomeColaborador: validatedTask.nomeColaborador,
            hashPass: hashedPassword
        })
        newTask.save()
            .then((task) => {
                response.status(201).json(task);
            })
            .catch(err => next(err))
    }
    catch (e) {
        console.log(e)
        return response.status(500).json({ erro: 'Algo de errado aconteceu ao criar uma nova Tarefa', e })
    }

}

/*   PUT   */
const updateTask = async (request, response) => {
    const { id } = request.params;

    //Verificando se o id é valido 
    if (!mongoose.Types.ObjectId.isValid(id)) { return response.status(400).json({ message: 'Specified id is not valid' }) }


    try {
        const selectedTask = await Task.findById(id)
        const validatedUpdate = await taskSchema.validate(request.body)

        if (selectedTask.concluido === false) {
            Task.findByIdAndUpdate(id, validatedUpdate)
                .then(() => { response.status(200).json(`${request.params.id} was sucessfully updated`) })
                .catch((err) => next(err))
        }
        else { return response.status(401).json({ message: `You cannot update tasks that have been already finished` }) }


    } catch (e) { response.status(401).json({ error: e }) }
}

/*  PATCH  */
const finishTask = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) { return response.status(400).json({ message: 'Specified id is not valid' }) }

    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndUpdate(id, { $set: { concluido: concluido } })
                    .then(() => { response.status(200).json({ message: `${request.params.id} is finished` }) })
            } else {
                response.status(400).json({ message: `This task has been already finished` })
            }
        })
        .catch((err) => response.status(400).json({ message: `This id's task was not found in our database ${err}` }))


}
const updateColaborator = async (request, response) => {
    const { id } = request.params;
    const { nomeColaborador } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) { return response.status(400).json({ message: 'Specified id is not valid' }) }

    try {
        const selectedTask = await Task.findById(id);
        if (!selectedTask.concluido) {
            Task.findByIdAndUpdate(id, { $set: { nomeColaborador: nomeColaborador } })
                .then(() => { response.status(200).json({ message: `The task's field 'nomeColaborador' was sucessfully updated` }) })
                .catch((err) => next(err))
        } else {
            return response.status(401).json({ message: `You cannot update fields of tasks that have been already finished` })
        }

    } catch (e) { response.status(500).json({ error: e }) }

}

const deleteTask = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndDelete(id)
                    .then(() => { response.status(200).json({ message: `The task (id: ${id}) was sucessfully deleted` }) })
                    .catch((err) => next(err))
            } else {
                response.status(401).json({ message: `You cannot delete tasks that have been already finished` })
            }
        })
        .catch(err => { throw new Errow(err) })
}

module.exports = {
    getAllTasks,
    getFinishedTasks,
    getUnfinishedTasks,
    getByID,
    createTask,
    updateTask,
    finishTask,
    updateColaborator,
    deleteTask

}