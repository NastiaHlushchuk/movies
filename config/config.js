require("dotenv").config();

module.exports = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  storagePath: process.env.STORAGE_PATH,
};
