const jwt = require("jsonwebtoken");

class TokenService {
  async generateAccessToken(id, name) {
    const accessToken = jwt.sign({ id, name }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME,
    });

    return accessToken;
  }

  async verifyAccessToken(token) {
    const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return data;
  }
}

module.exports = new TokenService();
