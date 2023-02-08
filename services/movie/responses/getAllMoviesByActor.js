class GetAllMovies {
  static createResponse(list) {
    const data = list.rows;
    let response = {};

    const movies = data.map((item) => {
      const movie = item.movies[0];
      return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        format: movie.format,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      };
    });

    response.data = movies;
    response.meta = { total: list.count };

    return response;
  }
}

module.exports = GetAllMovies;
