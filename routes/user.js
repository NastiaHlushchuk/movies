const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");


router.post("/users", controller.register);
router.post("/sessions", controller.login);

module.exports = router;
