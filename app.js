const express = require("express");
const http = require("http");
const fileUpload = require("express-fileupload");
const router = express.Router();
const { userRoutes, movieRoutes } = require("./routes");
const db = require("./models/index");
const app = express();
const config = require("./config/config");
const port = config.port;
const host = config.host;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.set("port", port);
app.set("host", host);

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});

db.sequelize.sync().then(() => {
  console.log("Database is ready");
});

router.use("/api/v1", userRoutes, movieRoutes);
app.use(router);

app.get("/", (req, res) => res.status(200).send("Welcome"));

module.exports = app;
