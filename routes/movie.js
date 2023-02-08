const express = require("express");
const router = express.Router();

const controller = require("../controllers/movie.controller");
const {
  authMiddleware: { authenticateUser },
} = require("../middleware");

router.get("/movies", authenticateUser, controller.findAll);
router.get("/movies/:id", authenticateUser, controller.findById);
router.post("/movies", authenticateUser, controller.create);
router.post("/movies/import", authenticateUser, controller.importFile);
router.patch("/movies/:id", authenticateUser, controller.update);
router.delete("/movies/:id", authenticateUser, controller.delete);

module.exports = router;
