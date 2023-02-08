class ImportMovies {
  static createResponse(list) {
    console.log(list);
    const count = list.length;
    let response = {};

    response.data = list;
    response.meta = { imported: count, total: count };
    return response;
  }
}

module.exports = ImportMovies;
