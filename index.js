require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "server.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
};

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
  .then(
    () => app.listen(port, () => console.log(`Server is running at ${port}`))
    // https.createServer(options, app).listen(443)
  )
  .catch((err) => console.log(err));
