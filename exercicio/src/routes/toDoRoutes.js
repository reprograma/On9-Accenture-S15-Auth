const express = require('express');
const router = express.Router();
const toDoControllers = require('../controllers/toDoController');
const authMiddlewares = require('../middlewares/auth');



//@route GET
//@desc Mostrar todas as tarefas registradas no nosso Banco de Dados
//@access Public
//endpoint http://localhost:8080/tarefas
router.get('/', toDoControllers.getAllTasks);

//@route GET
//@desc Mostrar todas as tarefas concluídas do nosso Banco de Dados
//@access Public
//endpoint http://localhost:8080/tarefas/concluidas
router.get('/concluidas', toDoControllers.getFinishedTasks);

//@route GET
//@desc Mostrar todas as tarefas  ainda não concluídas do nosso Banco de Dados
//@access Public
//endpoint http://localhost:8080/tarefas/naoconcluidas
router.get('/naoconcluidas', toDoControllers.getUnfinishedTasks);

//@route GET
//@desc Filtrar e mostrar uma tarefa pelo seu ID
//@access Public
//endpoint http://localhost:8080/tarefas/:id
router.get('/:id', toDoControllers.getByID);


//@route POST
//@desc Criar uma tarefa nova no nosso Banco de Dados
//@access Public
//endpoint http://localhost:8080/tarefas/cadastro
router.post('/cadastro', toDoControllers.createTask);


/* ============== MIDDLEWARE ==============*/
router.use(authMiddlewares)

//@route PUT
//@desc Atualizar uma tarefa, selecionando-a pelo seu ID
//@access Private
//endpoint http://localhost:8080/tarefas/editar/:id
router.put('/editar/:id', toDoControllers.updateTask);


//@route PATCH
//@desc Atualizar o campo 'concluido' da tarefa selecionada
//@access Private
//endpoint http://localhost:8080/tarefas/naoconcluidas/:id
router.patch('/naoconcluidas/:id', toDoControllers.finishTask);

//@route PATCH
//@desc Atualizar o campo 'nomeColaborador' da tarefa selecionada
//@access Private
//endpoint http://localhost:8080/tarefas/naoconcluidas/colaborador/:id
router.patch('/naoconcluidas/colaborador/:id', toDoControllers.updateColaborator);


//@route DELETE
//@desc Apagar uma tarefa do nosso Banco de Dados, selecionando-a pelo seu ID
//@access Private
//endpoint http://localhost:8080/tarefas/:id
router.delete('/:id', toDoControllers.deleteTask);

module.exports = router;
