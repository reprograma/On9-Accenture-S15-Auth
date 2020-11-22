const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserContoller')

/* 
@route GET
@desc obtem todos os usuários
@acess public // 
@endpoint http://localhost:8080/users
*/
router.get('/', controller.getAll)

/* 
@route GET
@desc obtem usuario por id
@acess public // 
@endpoint http://localhost:8080/users/:id
*/
router.get('/:id', controller.getById)

/* 
@route POST 
@desc cria novos usuarios
@acess public // qualquer um pode criar um novo usuario, nenhuma regra é aplicada
@endpoint http://localhost:8080/users/novoUser
*/
router.post('/novoUser', controller.postUser)


module.exports = router