class NoteCreateService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ content, created_at, user_id }) {
    const noteCreated = await this.noteRepository.create({
      content,
      created_at,
      user_id,
    });

    return noteCreated;
  }
}

module.exports = NoteCreateService;
