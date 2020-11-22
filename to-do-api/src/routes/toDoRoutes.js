const express = require("express");
const router = express.Router();
const controller = require("../controllers/toDoController");
const authMiddleware = require("../middlewares/auth");

//@route GET tarefas/
router.get("/", controller.getAll);

//@route GET tarefas/:id
router.get("/:id", controller.getById);

//@route GET tarefas/concluidas
router.get("/status/concluidas", controller.getConcluidas);

//@route GET tarefas/naoconcluidas
router.get("/status/naoconcluidas", controller.getPendentes);

//@route POST tarefas/cadastro
router.post("/cadastro", controller.criarTarefa);

//@route PUT tarefas/editar/:id
router.put("/editar/:id", controller.atualizarTarefa);

//@route PATCH tarefas/naoconcluidas/:id
router.patch("/naoconcluidas/:id", controller.concluirTarefa);

//@route PATCH tarefas/naoconcluidas/colaborador/:id
router.patch("/naoconcluidas/colaborador/:id", controller.alterarResponsavel);

//@route DELETE tarefas/:id
router.delete("/:id", controller.deletarTarefa);

module.exports = router;
