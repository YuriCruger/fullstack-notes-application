const sqliteConnection = require("../../sqlite");

const createNotes = require("./createNotes");
const createUsers = require("./createUsers");

async function migrationsRun() {
  const schemas = [createNotes, createUsers].join(";");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

module.exports = migrationsRun;
