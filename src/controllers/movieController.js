import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create", { pageTitle: "Create Page" });
});

movieController.post("/create", async(req, res) => {
  const movieData = req.body;
  await movieService.create(movieData);
  res.redirect("/");
});

movieController.get("/:movieId/details", async(req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId);

  const ratingViewData = "&#x2605;".repeat(Math.trunc(movie.rating));
  res.render("details", {
    movie,
    pageTitle: "Details Page",
    rating: ratingViewData,
  });
});

movieController.get("/search", async(req, res) => {
  const filter = req.query;

  const movies = await movieService.getAll(filter);

  res.render("search", { movies, filter, pageTitle: "Search Page" });
});

movieController.get("/:movieId/attach", (req, res)=>{
  res.render("casts/attach");
});


export default movieController;
