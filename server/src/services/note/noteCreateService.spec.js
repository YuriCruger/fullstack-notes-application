const NoteCreateService = require("./NoteCreateService");

const NoteRepositoryInMemory = require("../../repositories/note/NoteRepositoryInMemory");

describe("NoteCreateService", () => {
  it("note should be create", async () => {
    const note = {
      content: "Olá mundo",
      created_at: "2024",
      user_id: "100",
    };

    const noteRepositoryInMemory = new NoteRepositoryInMemory();
    const noteCreateService = new NoteCreateService(noteRepositoryInMemory);

    const noteCreated = await noteCreateService.execute(note);

    expect(noteCreated).toHaveProperty("id");
  });
});
