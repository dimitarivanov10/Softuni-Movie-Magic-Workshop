import express from "express";
import handlebars from "express-handlebars";

const app = express();

//Setup handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

//Setup middlewares
app.use(express.static("src/public"));

//Routes
app.get("/", (req, res) => {
  res.render("home", { layout: false });
});

//Start server
app.listen(5000, () =>
  console.log("Server listening on http://localhost5000...")
);
