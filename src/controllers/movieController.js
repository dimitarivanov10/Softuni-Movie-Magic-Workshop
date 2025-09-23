import { Router } from "express";

const movieController = Router();

movieController.get("/movies/create", (req, res) => {
  res.send("Create movie page");
});

export default movieController;
