const { Movie, Actor } = require("./index");

module.exports = (sequelize, DataTypes) => {
  const ActorsMovies = sequelize.define("ActorsMovies", {
    ActorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor,
        key: "id",
      },
    },
    MovieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
    },
  });

  return ActorsMovies;
};
