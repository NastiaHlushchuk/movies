class ImportMovies {
  static createResponse(list) {
    const total = list.length;
    let count = 0;
    list.forEach((item) => {
      if (item.hasOwnProperty("id")) {
        count += 1;
      }
    });
    let response = {};

    response.data = list;
    response.meta = { imported: count, total: total };
    return response;
  }
}

module.exports = ImportMovies;
