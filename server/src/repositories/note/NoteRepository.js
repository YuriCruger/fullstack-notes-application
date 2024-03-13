const sqliteConnection = require("../../database/sqlite");

class NoteRepository {
  async create({ content, created_at, user_id }) {
    const database = await sqliteConnection();

    const noteId = await database.run(
      "INSERT INTO notes (content, created_at, user_id ) VALUES (?, ?, ?)",
      [content, created_at, user_id]
    );

    return { id: noteId };
  }

  async findByUserId(user_id) {
    const database = await sqliteConnection();

    const notes = await database.all("SELECT * FROM notes WHERE user_id = ?", [
      user_id,
    ]);
    return notes;
  }

  async deleteById(id) {
    const database = await sqliteConnection();

    const noteDelete = await database.run("DELETE FROM notes WHERE id = ?", [
      id,
    ]);

    return noteDelete;
  }
}

module.exports = NoteRepository;
