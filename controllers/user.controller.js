const userService = require("../services/user/user.service");
const tokenService = require("../services/token/token.service");
class UserController {
  async register(req, res) {
    try {
      const user = await userService.createUser(req);
      if (!user) {
        return res.status(400).send("Password isn't confirmed");
      }
      const accessToken = await tokenService.generateAccessToken(
        user.id,
        user.name
      );
      return res.status(201).send({
        data: { accessToken },
        status: 1,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.code || 400).send("Invalid input data");
    }
  }

  async login(req, res) {
    try {
      const user = await userService.logIn(req);
      if (!user) {
        return res.status(401).send("Email or password is wrong");
      }
      const accessToken = await tokenService.generateAccessToken(
        user.id,
        user.name
      );
      return res.status(200).send({
        data: { accessToken },
        status: 1,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.code || 401).send("Invalid credentials");
    }
  }
}

const controllerInstance = new UserController();
module.exports = controllerInstance;
