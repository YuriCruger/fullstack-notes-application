const { Router } = require("express");

const notesRoutes = require("./notes.routes");
const usersRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/notes", notesRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
