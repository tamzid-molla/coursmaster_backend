const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectToDB = require("./config/db");

connectToDB()

app.use(cors())


app.get("/", (req, res) => {
  res.send({ message: "Server running good" });
});

module.exports = app;