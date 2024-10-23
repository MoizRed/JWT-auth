const express = require("express");
const mongoose = require("mongoose");
const dotevn = require("dotenv").config();
const app = express();

const authroutes = require("./routes/authRoutes");

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.DB_LOCAL;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(
      3000,
      console.log(
        ` Connected ! , listening on port http://${process.env.HOST}:${process.env.PORT}`,
      ),
    )
  )
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authroutes);
