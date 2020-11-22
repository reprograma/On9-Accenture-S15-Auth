const express = require("express");
const router = express.Router();
const controller = require("../controllers/colaboradorController");
const authMiddleware = require("../middlewares/auth");

router.post("/", controller.post);

module.exports = router;
