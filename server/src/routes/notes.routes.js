const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);
notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.delete("/", notesController.delete);

module.exports = notesRoutes;
