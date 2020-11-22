const { request, response } = require("express")
const mongoose = require("mongoose");
const Task = require("../model/Task");
const bcrypt = require("bcrypt");
const bcryptSalt = 8;

//GET
const getAll = (request, response) => {

    Task.find()
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));
}

//GET
const getById = (request, response) => {

    const { id } = request.params;

    Task.findById(id)
        .then((id) => {
            response.status(200).json(id);
        })
        .catch(err => next(err));


}

//GET
const getByTrue = (request, response) => {

    Task.find({ done: true })
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));


}

//GET
const getByFalse = (request, response) => {

    Task.find({ done: false })
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));


}

//POST



const addTask = async (req, res, next) => {
    const { collab, password, description } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    try {
      const hashPass = await bcrypt.hashSync(password, salt);
  
      const newTask = new Task({
        collab,
        description,
        hashPass
      });
      newTask.save()
        .then((task) => {
            res.status(201).json(task);
        })
        .catch(err => next(err));
    } catch (e) {
      return res.status(401).json({ error: 'erro' });
    }
  
    
    
    /*let { description, collab } = request.body;

    const newTask = new Task({
        description,
        collab
    });

    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));*/

}

//exports.post = async (req, res, next) => { 
    
  

//PUT
const updateTask = (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    Task.findByIdAndUpdate(id, request.body)
        .then(() => {
            response.status(200).json({ message: " updated successfully" });
        })
        .catch((err) => {
            response.json(err);
        });

}

//PATCH
const doneTask = (request, response) => {
    const { id } = request.params;

    Task.findById(id)
        .then((tasks) => {
            if (tasks.done == true) {
                response.status(400).json({ message: "task already done" });
            } else {

                Task.findByIdAndUpdate(id, { $set: { done: true } })
                    .then(() => {
                        response.status(200).json({ message: "task is finished" });
                    })
                    .catch((err) => {
                        response.json(err);
                    })
            }
        })

}

//PATCH
const collabTask = (request, response) => {

    const { id } = request.params;
    const { collab } = request.body;

    Task.findById(id)
        .then((tasks) => {
            if (tasks.done == true) {
                response.status(400).json({ message: "task already done" });
            } else {

                Task.findByIdAndUpdate(id, { $set: { collab: collab } })
                    .then(() => {
                        response.status(200).json({ message: "collab updated" });
                    })
                    .catch((err) => {
                        response.json(err);
                    })
            }
        })
}


//DELETE
const deletetask = (request, response) => {
    const { id } = request.params

    Task.findById(id)
        .then((tasks) => {
            if (tasks.done == true) {
                response.status(400).json({ message: "task already done" });
            } else {
                Task.findByIdAndDelete(id)
                    .then(() => {
                        response.status(200).json("task deleted");
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            }
        })
}

module.exports = {
    getAll,
    getById,
    getByTrue,
    getByFalse,
    addTask,
    updateTask,
    doneTask,
    collabTask,
    deletetask 
}

