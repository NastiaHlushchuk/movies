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
      const { actors, year } = req.body;
      if (!(+year >= 1850 && +year <= 2021)) {
        return "Movie's year must be between 1850 - 2021";
      }

      const movie = await repositoryService.create(req.body);

      if (movie && movie.id) {
        const addedActors = await repositoryService.createActors(actors);
        await repositoryService.addActorsToMovie(movie.id, addedActors);

        return CreateMovie.createResponse(movie, addedActors);
      } else {
        return movie;
      }
    } catch (err) {
      throw err;
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
          throw err;
        }
      });

      const dataFromFile = await this.processLineByLine(path);
      const transformedData = await this.transformData(dataFromFile);

      const createdMovies = await Promise.all(
        transformedData.map(async (data) => {
          const movie = await repositoryService.create(data);
          if (movie && movie.id) {
            const addedActors = await repositoryService.createActors(
              data.actors
            );
            await repositoryService.addActorsToMovie(movie.id, addedActors);
          }
          return movie;
        })
      );
      // console.log("MOVIES", createdMovies);
      return ImportMovies.createResponse(createdMovies);
    } catch (err) {
      throw err;
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
          year: item["Release Year"],
          format: item.Format,
          actors: actors,
        };
      })
    );

    return transformed;
  }
}

module.exports = new MovieService();
