const sqliteConnection = require("../database/sqlite");

class NotesController {
  async create(request, response) {
    const { content, created_at } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    await database.run(
      "INSERT INTO notes (content, created_at, user_id ) VALUES (?, ?, ?)",
      [content, created_at, user_id]
    );

    return response.status(201).json();
  }

  async index(request, response) {
    const database = await sqliteConnection();
    const user_id = request.user.id;

    const notes = await database.all("SELECT * FROM notes WHERE user_id = ?", [
      user_id,
    ]);

    return response.json(notes);
  }

  async delete(request, response) {
    const { id } = request.body;

    const database = await sqliteConnection();

    await database.run("DELETE FROM notes WHERE id = ?", [id]);

    return response.status(200).json();
  }
}

module.exports = NotesController;
