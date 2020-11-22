const express = require("express")
const router = express.Router()
const controller = require("../controllers/sessionController")


/**
@route POST 
@desc Access the system
@access Public 
@endpoint http://localhost:8080/session/
**/
router.post("/", controller.accessToken)

module.exports = router
