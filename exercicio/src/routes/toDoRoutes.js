const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")
const authMiddlewares = require('../middlewares/auth')


router.get("/", controller.getAll)
router.get('/concluidas', controller.getConcluidas);
router.get('/naoconcluidas', controller.getNaoConcluidas);
router.get('/:id', controller.getById);

router.post("/cadastro", controller.criarTarefa)

router.put("/editar/:id", controller.atualizarTarefa)

router.patch("/naoconcluidas/:id", controller.concluirTarefa)
router.patch('/naoconcluidas/colaborador/:id', controller.atualizarColaborador);

router.delete("/:id", controller.deletarTarefa)


router.use(authMiddlewares)

module.exports = router



