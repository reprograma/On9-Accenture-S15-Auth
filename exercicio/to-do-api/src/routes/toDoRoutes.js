const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth")
const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.post("/cadastro", controller.criarTarefa)

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)

router.delete("/:id", controller.deletarTarefa)

router.use(authMiddleware)

module.exports = router