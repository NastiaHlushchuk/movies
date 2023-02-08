module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define(
    "Actor",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  Actor.associate = (models) => {
    Actor.belongsToMany(models.Movie, {
      through: models.ActorsMovies,
      as: "movies",
    });
  };

  return Actor;
};
