require("dotenv").config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  host: process.env.DB_HOST,
};