const express = require ('express')
const router = express.Router()
const sessionController = require('../controllers/sessionController')

//@route POST
//@desc Entrada algum usuário no sistema
//@access Public
//endpoint http://localhost:3000/sessions/
router.post('/', sessionController.accessToken)

module.exports = router;