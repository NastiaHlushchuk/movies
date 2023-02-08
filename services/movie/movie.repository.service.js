const { Movie, Actor, ActorsMovies } = require("../../models");
const Op = require("sequelize").Op;

class MovieRepositoryService {
  async findById(id) {
    return await Movie.findOne({
      where: {
        id,
      },
      attributes: ["id", "title", "year", "format"],
      include: [
        {
          model: Actor,
          as: "actors",
          through: { attributes: [] },
        },
      ],
    });
  }

  async findAll(title) {
    let conditions = {
      order: [["title", "ASC"]],
    };

    if (title) {
      conditions.where = { title: { [Op.like]: `%${title}%` } };
    }

    return await Movie.findAndCountAll(conditions);
  }

  async findByActor(actor) {
    return await Actor.findAndCountAll({
      where: {
        name: {
          [Op.like]: `${actor}%`,
        },
      },
      attributes: [],
      include: [
        {
          model: Movie,
          as: "movies",
          through: { attributes: [] },
        },
      ],
    });
  }

  async findByTitle(title) {
    return await Movie.findOne({
      where: {
        [Op.like]: `${title}%`,
      },
    });
  }

  async create(movie) {
    return await Movie.create({
      title: movie.title,
      year: movie.year,
      format: movie.format,
    });
  }

  async update(movie, newData) {
    return await movie.update(newData, {
      returning: true,
    });
  }

  async delete(movie) {
    return await movie.destroy();
  }

  async createActors(actors) {
    const created = await Promise.all(
      actors.map(async (actor) => {
        return await Actor.create({ name: actor });
      })
    );

    return created;
  }

  async addActorsToMovie(movieId, actors) {
    const added = await Promise.all(
      actors.map(async (actor) => {
        return await ActorsMovies.create({
          ActorId: actor.id,
          MovieId: movieId,
        });
      })
    );

    return added;
  }

  async updateActorsToMovie(movieId) {
    return await ActorsMovies.destroy({ where: { MovieId: movieId } });
  }
}
module.exports = new MovieRepositoryService();
