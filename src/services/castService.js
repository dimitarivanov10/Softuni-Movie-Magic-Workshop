import Cast from "../models/Cast.js";

export default {
  getAll(filter = {}) {
    let query = Cast.find();

    if (filter.includes) {
      query = query.find({ _id: { $in: filter.includes } });
    }

    if (filter.excludes) {
      query = query.find({ _id: { $nin: filter.excludes } });
    }
    return query;
  },
  create(castData) {
    return Cast.create(castData);
  },
};
