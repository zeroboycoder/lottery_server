require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Variables
const uri = process.env.DATABASE_URI;
const port = process.env.PORT || 8000;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(port, () => console.log(`Server is running at ${port}`))
  )
  .catch((err) => console.log(err));
