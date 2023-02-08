const ALLOWED_VALUES = ["VHS", "DVD", "Blu-ray"];

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (!ALLOWED_VALUES.includes(value)) {
          throw new Error(`Invalid value for Movie.format: ${value}`);
        }
        this.setDataValue("format", value);
      },
    },
  });

  Movie.associate = (models) => {
    Movie.belongsToMany(models.Actor, {
      through: models.ActorsMovies,
      as: "actors",
    });
  };

  return Movie;
};
