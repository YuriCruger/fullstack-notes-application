const UserRepository = require("../repositories/user/UserRepository");

const UserCreateService = require("../services/user/UserCreateService");

class UsersController {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();

    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ email, password });

    return response.status(201).json();
  }
}

module.exports = UsersController;
