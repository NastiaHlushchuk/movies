const movieService = require("../services/movie/movie.service");

class MovieController {
  async findAll(req, res) {
    try {
      const list = await movieService.findAll(req);
      return res
        .status(200)
        .send({ data: list.data, meta: list.meta, status: 1 });
    } catch (err) {
      return res.status(err.code || 404).send("Movies not found");
    }
  }

  async findById(req, res) {
    try {
      const movie = await movieService.findById(req);
      if (!movie) {
        return res.status(404).send(`Movie with id ${req.params.id} not found`);
      }
      return res.status(200).send({ data: movie, status: 1 });
    } catch (err) {
      return res.status(err.code || 404).send(err.message || "Movie not found");
    }
  }

  async create(req, res) {
    try {
      const movie = await movieService.create(req);
      if (!movie.id) {
        return res.status(422).send("Invalid value for Movie.format");
      }
      return res.status(201).send({ data: movie, status: 1 });
    } catch (err) {
      return res.status(err.code || 422).send(err.message || "Invalid entity");
    }
  }

  async update(req, res) {
    try {
      const movie = await movieService.update(req);
      return res.status(200).send({ data: movie, status: 1 });
    } catch (err) {
      return res.status(err.code || 422).send(err.message || "Invalid entity");
    }
  }

  async delete(req, res) {
    try {
      await movieService.delete(req);
      return res.status(200).send({ status: 1 });
    } catch (err) {
      return res
        .status(err.code || 404)
        .send(err.messsage || "Movie not found");
    }
  }

  async importFile(req, res) {
    try {
      if (!req.files) {
        return res.status(400).send("No files were uploaded");
      }
      const list = await movieService.importFile(req);
      return res
        .status(200)
        .send({ data: list.data, meta: list.meta, status: 1 });
    } catch (err) {
      return res.status(err.code || 422).send(err.message || "Invalid entity");
    }
  }
}

const controllerInstance = new MovieController();
module.exports = controllerInstance;
