const { User } = require("../../models");

class UserRepositoryService {
  async createUser(user) {
    return await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  async findUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }
}

module.exports = new UserRepositoryService();
