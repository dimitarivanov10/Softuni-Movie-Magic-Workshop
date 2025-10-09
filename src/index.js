import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import routes from "./routes.js";
import CookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

//Setup DB
const url = "mongodb://localhost:27017";

try {
  await mongoose.connect(url, {
    dbName: "movie-magic"
  })
  console.log("DB Successfully connected");
} catch (error) {
  console.error(error.message);
}

//Setup handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions:{
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true
    }
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

//Setup middlewares
app.use(express.static("src/public"));
app.use(express.urlencoded());

//Using cookieparser
app.use(CookieParser())

//Use the auth middleware
app.use(authMiddleware);

//Routes
app.use(routes);

//Start server
app.listen(5000, () =>
  console.log("Server listening on http://localhost5000...")
);
