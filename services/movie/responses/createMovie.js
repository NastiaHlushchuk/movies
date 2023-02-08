class CreateMovie {
  static createResponse(movie, addedActors) {
    const response = {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      format: movie.format,
      actors: addedActors.map((actor) => {
        return {
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt,
        };
      }),
    };
    return response;
  }
}

module.exports = CreateMovie;
