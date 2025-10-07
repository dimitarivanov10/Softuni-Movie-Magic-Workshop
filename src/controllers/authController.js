import { Router } from "express";

const authController = Router();

authController.get("/", (req, res)=>{
    res.send("Auth revoked");
})

export default authController;