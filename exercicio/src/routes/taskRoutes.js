const express = require("express")
const router = express.Router()
//const controller = require("../controllers/taskDoneController")
const authMiddleware = require("../middlewares/auth")
const controller = require("../controllers/taskController")

/**
@route GET tasks
@desc Return all tasks
@access Public 
@endpoint http://localhost:8080/tasks/
**/
router.get("/", controller.getAll)

router.use(authMiddleware);

/**
@route GET tasks/true
@desc Return only completed tasks
@access Private 
@endpoint http://localhost:8080/tasks/true
**/
router.get("/true", controller.getByTrue);

/**
@route GET tasks/false
@desc Return only not completed tasks
@access Private 
@endpoint http://localhost:8080/tasks/false
**/
router.get("/false", controller.getByFalse);

/**
@route GET tasks/:id
@desc Return only a single task by id: identifier
@access Private 
@endpoint http://localhost:8080/tasks/:id
**/
router.get("/:id", controller.getById);

/**
@route POST tasks/:id
@desc Create a new task
@access Private 
@endpoint http://localhost:8080/tasks/add
**/
router.post("/add", controller.addTask)

/**
@route PUT tasks/:id
@desc Update task
@access Private 
@endpoint http://localhost:8080/tasks/:id
**/
router.put("/:id", controller.updateTask)

/**
@route PATCH false/:id
@desc task completed
@access Private 
@endpoint http://localhost:8080/tasks/false/:id
**/
router.patch("/false/:id", controller.doneTask)

/**
@route PATCH false/collab/:id
@desc update collab
@access Private 
@endpoint http://localhost:8080/tasks/false/collab/:id
**/
router.patch("/false/collab/:id", controller.collabTask)

/**
@route DELETE /:id
@desc delete task
@access Private 
@endpoint http://localhost:8080/tasks/:id
**/
router.delete("/:id", controller.deletetask)

module.exports = router