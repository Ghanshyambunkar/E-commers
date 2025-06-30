class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Convert stringified operators like gte/lte to $gte/$lte
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const parsedQuery = JSON.parse(queryStr);

    // 👇 Convert ratings filter values to Number
    if (
      parsedQuery.rating &&
      typeof parsedQuery.rating === "object"
    ) {
      Object.keys(parsedQuery.rating).forEach((key) => {
        parsedQuery.rating[key] = Number(parsedQuery.rating[key]);
      });
    }

    // 👇 Convert price filter values to Number
    if (
      parsedQuery.price &&
      typeof parsedQuery.price === "object"
    ) {
      Object.keys(parsedQuery.price).forEach((key) => {
        parsedQuery.price[key] = Number(parsedQuery.price[key]);
      });
    }

    console.log("🔍 Final parsedQuery:", parsedQuery);

    this.query = this.query.find(parsedQuery);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
