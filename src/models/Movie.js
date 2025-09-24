import { v4 as uuid } from "uuid";
import fs from "fs/promises";
const dbSerialized = await fs.readFile("./src/db.json", { encoding: "utf-8" });
let db = JSON.parse(dbSerialized);

export default class Movie {
  constructor(data) {
    Object.assign(this, data);
    this._id = uuid();
  }

  static find(filter = {}) {
    let result = db.movies.slice();

    if (filter._id) {
      result = db.movies.filter((movie) => movie._id === filter_.id);
    }

    if (filter.title) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(filter.title.toLowerCase())
      );
    }

    if (filter.genre) {
      result = result.filter(
        (movie) => movie.genre.toLowerCase() === filter.genre.toLowerCase()
      );
    }

    if (filter.year) {
      result = result.filter((movie) => movie.year === filter.year);
    }

    return result;
  }

  static findOne(filter = {}) {
    let result = db.movies[0];

    if (filter._id) {
      result = db.movies.find((movie) => movie._id === filter._id);
    }
    return result;
  }

  get id() {
    return this._id;
  }

  async save() {
    db.movies.push(this);

    const dbSerialized = JSON.stringify(db, null, 2);

    await fs.writeFile("./src/db.json", dbSerialized);

    return this;
  }
}
