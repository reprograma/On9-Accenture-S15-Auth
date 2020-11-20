const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")
const authMiddleware = require("../middlewares/auth")

router.get("/", controller.getAll)

router.get("/concluidas", controller.tarefaConcluida)

router.get("/naoconcluidas", controller.tarefaNaoConcluida)

router.post("/cadastro", controller.criarTarefa)

router.use(authMiddleware)

router.get("/:id", controller.tarefaUnica)

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)

router.patch("/naoconcluidas/colaborador/:id", controller.atualizarColaborador)

router.delete("/:id", controller.deletarTarefa)




module.exports = router
