const repositoryService = require("./user.repository.service");

class UserService {
  async createUser(req) {
    try {
      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) return false;

      const user = await repositoryService.createUser(req.body);

      return user;
    } catch (err) {
      throw err;
    }
  }

  async logIn(req) {
    try {
      const { email, password } = req.body;

      const user = await repositoryService.findUserByEmail(email);

      if (user && password !== user.password) return false;

      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UserService();
