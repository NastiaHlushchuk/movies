const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const controller = require("../controllers/user.controller");
const validate = require("../middleware/userMiddleware");

router.post("/users", checkSchema(validate), controller.register);
router.post("/sessions", controller.login);

module.exports = router;
