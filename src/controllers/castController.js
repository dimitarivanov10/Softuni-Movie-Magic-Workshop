import { Router } from "express";

const castController = Router();

castController.get("/", (req, res) => {
    res.send("Kebab case");
});

export default castController;
