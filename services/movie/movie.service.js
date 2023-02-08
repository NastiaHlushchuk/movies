const repositoryService = require("./movie.repository.service");
const CreateMovie = require("./responses/createMovie");
const GetAllMoviesByActor = require("./responses/getAllMoviesByActor");
const GetAllMovies = require("./responses/getAllMovies");
const ImportMovies = require("./responses/importMovies");
const config = require("../../config/config");
const fs = require("fs");
const readline = require("readline");
const storagePath = config.storagePath;

class MovieService {
  async findById(req) {
    const id = req.params.id;
    const movie = await repositoryService.findById(id);
    return movie;
  }

  async findAll(req) {
    const { title, actor } = req.query;
    let movies;

    if (actor) {
      movies = await repositoryService.findByActor(actor);
      return GetAllMoviesByActor.createResponse(movies);
    } else {
      movies = await repositoryService.findAll(title);
      return GetAllMovies.createResponse(movies);
    }
  }

  async create(req) {
    try {
      const actors = req.body.actors;

      const movie = await repositoryService.create(req.body);
      const addedActors = await repositoryService.createActors(actors);
      await repositoryService.addActorsToMovie(movie.id, addedActors);

      if (movie && movie.id) {
        return CreateMovie.createResponse(movie, addedActors);
      } else {
        return movie;
      }
    } catch (err) {
      return err;
    }
  }

  async update(req) {
    try {
      const id = req.params.id;
      const newData = req.body;

      if (newData.actors) {
        const addedActors = await repositoryService.createActors(
          newData.actors
        );
        await repositoryService.updateActorsToMovie(id);
        await repositoryService.addActorsToMovie(id, addedActors);
      }
      const movie = await repositoryService.findById(id);
      const updated = await repositoryService.update(movie, newData);

      return updated;
    } catch (err) {
      return err;
    }
  }

  async delete(req) {
    try {
      const id = req.params.id;
      const movie = await repositoryService.findById(id);
      const deleted = await repositoryService.delete(movie);

      return deleted;
    } catch (err) {
      return err;
    }
  }

  async importFile(req) {
    try {
      const file = req.files.movies;
      const path = storagePath + "/files/" + file.name;
      file.mv(path, (err) => {
        if (err) {
          return err;
        }
      });

      const dataFromFile = await this.processLineByLine(path);
      const transformedData = await this.transformData(dataFromFile);

      const createdMovies = await Promise.all(
        transformedData.map(async (data) => {
          const movie = await repositoryService.create(data);
          const addedActors = await repositoryService.createActors(data.actors);
          await repositoryService.addActorsToMovie(movie.id, addedActors);

          return await movie;
        })
      );

      return ImportMovies.createResponse(createdMovies);
    } catch (err) {
      return err;
    }
  }

  async processLineByLine(path) {
    const rl = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity,
    });

    const objects = [];
    let bufferObject = {};

    for await (const line of rl) {
      if (line.length !== 0) {
        const parts = line.split(/: (.*)/s);
        bufferObject[parts[0]] = parts[1];
      } else {
        objects.push(bufferObject);
        bufferObject = {};
      }
    }
    if (Object.keys(bufferObject).length) {
      objects.push(bufferObject);
    }
    return objects;
  }

  async transformData(data) {
    const transformed = Promise.all(
      data.map((item) => {
        let actors = item.Stars.split(", ");
        return {
          title: item.Title,
          year: Object.values(item)[1],
          format: item.Format,
          actors: actors,
        };
      })
    );

    return transformed;
  }
}

module.exports = new MovieService();
