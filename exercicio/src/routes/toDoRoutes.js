const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")
const authMiddleware = require("../middlewares/auth")


router.use(authMiddleware)

/* 
@route GET
@desc obtem todas as tarefas
@acess private // acesso apenas com o token
@endpoint http://localhost:8080/tarefas
*/
router.get("/", controller.getAll)


/* 
@route POST
@desc cria uma nova tarefa
@acess private // acesso apenas com o token
@endpoint http://localhost:8080/tarefas/cadastro
*/
router.post("/cadastro", controller.criarTarefa)

/* 
@route PUT
@desc edita campos concluido, descricao e nomeColaborador da tarefa
@acess private // acesso apenas com o token
@endpoint http://localhost:8080/tarefas/editar/:id
*/
router.put("/editar/:id", controller.atualizarTarefa)


/* 
@route PATCH
@desc conclui tarefa, edita apenas o campo concluido
@acess private // acesso apenas com o token
@endpoint http://localhost:8080/tarefas/naoconcluidas/:id
*/
router.patch("/naoconcluidas/:id", controller.concluirTarefa)


/* 
@route DELETE
@desc deleta uma tarefa
@acess private // acesso apenas com o token
@endpoint http://localhost:8080/tarefas/:id
*/
router.delete("/:id", controller.deletarTarefa)


module.exports = router