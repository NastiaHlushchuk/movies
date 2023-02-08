class GetAllMovies {
    static createResponse(list) {
      const data = list.rows;
      let response = {};
  
      response.data = data.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          format: movie.format,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
        };
      });
      response.meta = { total: list.count };
      return response;
    }
  }
  
  module.exports = GetAllMovies;
  