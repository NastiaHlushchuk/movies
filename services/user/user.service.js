const repositoryService = require("./user.repository.service");

class UserService {
  async createUser(req) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) return false;

    const user = await repositoryService.createUser(req.body);
    return user;
  }

  async logIn(req) {
    const { email, password } = req.body;

    const user = await repositoryService.findUserByEmail(email);

    if (user && password !== user.password) return false;

    return user;
  }
}

module.exports = new UserService();
