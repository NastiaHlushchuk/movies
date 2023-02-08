const ALLOWED_VALUES = ["VHS", "DVD", "Blu-ray"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable("Movie", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      format: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          if (!ALLOWED_VALUES.includes(value)) {
            throw new Error(`Invalid value for Movie.format: ${value}`);
          }
          this.setDataValue("format", value);
        },
      },
    });

    await queryInterface.createTable("Actor", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable("ActorsMovies", {
      ActorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Actor",
          key: "id",
        },
      },
      MovieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Movie",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ActorsMovies");
    await queryInterface.dropTable("Actor");
    await queryInterface.dropTable("Movie");
    await queryInterface.dropTable("User");
  },
};
