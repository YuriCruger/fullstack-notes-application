const createNotes = `
CREATE TABLE IF NOT EXISTS notes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
created_at TIMESTAMP,
content TEXT,
user_id INTEGER REFERENCES users(id)
)
`;

module.exports = createNotes;
