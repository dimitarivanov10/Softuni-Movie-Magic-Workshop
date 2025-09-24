import { v4 as uuid } from "uuid";

const movies = [
  {
    _id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    title: "Sundown",
    genre: "Drama",
    description:
      "A wealthy man attempts to abandon his family on vacation after the death of his mother.",
    imageUrl: "/img/sundown-movie.jpg",
    director: "Michel Franco",
    year: 2021,
    rating: 6.1,
    category: "movie",
  },
  {
    _id: "b7c8d9e0-f1g2-3h4i-5j6k-l7m8n9o0p1q2",
    title: "The Forgotten",
    genre: "Drama, Romance, War",
    description:
      "A Ukrainian language teacher and a rebellious teenage student fall for each other during the tumultuous time of the Russian-Ukrainian war.",
    imageUrl: "/img/the-forgotten-movie.jpg",
    director: "Artemio Benki",
    year: 2019,
    rating: 6.6,
    category: "movie",
  },
  {
    _id: "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8",
    title: "Horizon: An American Saga – Chapter 1",
    genre: "Western",
    description:
      "Chronicles a multi-faceted, 15-year span of pre-and post-Civil War expansion and settlement of the American west.",
    imageUrl: "/img/horizon-am-saga-movie.jpg",
    director: "Kevin Costner",
    year: 2024,
    rating: 5.5,
    category: "movie",
  },
  {
    _id: "d5e6f7g8-h9i0-1j2k-3l4m-n5o6p7q8r9s0",
    title: "Whispers in Shadows",
    genre: "Crime, Drama, Thriller",
    description:
      "A fixer for a criminal organization is hired by a crime boss to protect her daughter during her trip to the city for her birthday celebration.",
    imageUrl: "/img/whispers-in-shadows-movie.jpg",
    director: "Ralph Sepe Jr.",
    year: 2024,
    rating: 7.2,
    category: "movie",
  },
];

export default class Movie {
  constructor(data) {
    Object.assign(this, data);
    this._id = uuid();
  }

  static find(filter = {}) {
    let result = movies.slice();

    if (filter._id) {
      result = movies.filter((movie) => movie._id === filter_.id);
    }
    return result;
  }

  static findOne(filter = {}) {
    let result = movies[0];

    if (filter._id) {
      result = movies.find((movie) => movie._id === filter._id);
    }
    return result;
  }

  get id() {
    return this._id;
  }

  save() {
    movies.push(this);
    return this;
  }
}
