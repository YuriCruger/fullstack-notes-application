const NoteRepository = require("../repositories/note/NoteRepository");

const NoteCreateService = require("../services/note/NoteCreateService");

class NotesController {
  async create(request, response) {
    const { content, created_at } = request.body;
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();

    const noteCreateService = new NoteCreateService(noteRepository);

    await noteCreateService.execute({ content, created_at, user_id });

    return response.status(201).json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();
    const notes = await noteRepository.findByUserId(user_id);

    return response.json(notes);
  }

  async delete(request, response) {
    const { id } = request.body;

    const noteRepository = new NoteRepository();
    const notes = await noteRepository.deleteById(id);

    return response.status(200).json(notes);
  }
}

module.exports = NotesController;
