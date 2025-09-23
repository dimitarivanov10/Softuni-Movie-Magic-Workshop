import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.send("Working 100%");
})

app.listen(5000, ()=>console.log("Server listening on http://localhost 5000..."));

