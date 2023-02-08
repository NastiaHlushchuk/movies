const { tokenService } = require("../services");

module.exports = {
  authenticateUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send("Unauthorized");
      }
      const decoded = await tokenService.verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized");
    }
  },
};
