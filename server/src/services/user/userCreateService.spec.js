const UserCreateService = require("./UserCreateService");

const UserRepositoryInMemory = require("../../repositories/user/UserRepositoryInMemory");
const AppError = require("../../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("user should be create", async () => {
    const user = {
      email: "usertest@teste.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be create with exists email ", async () => {
    const user1 = {
      email: "user@test.com",
      password: "123",
    };

    const user2 = {
      email: "user@test.com",
      password: "1234",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Este email já está em uso.")
    );
  });
});
