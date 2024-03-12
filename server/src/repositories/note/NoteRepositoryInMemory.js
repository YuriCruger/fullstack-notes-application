class NoteRepositoryInMemory {
  notes = [];

  async create({ content, created_at, user_id }) {
    const note = {
      id: Math.floor(Math.random() * 1000) + 1,
      content,
      created_at,
      user_id,
    };

    this.notes.push(note);

    return note;
  }
}

module.exports = NoteRepositoryInMemory;
