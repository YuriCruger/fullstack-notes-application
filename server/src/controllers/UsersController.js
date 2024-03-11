const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      return response
        .status(400)
        .json({ message: "Este email já está em uso" });
    }

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);

    return response.status(201).json();
  }
}

module.exports = UsersController;
