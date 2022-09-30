const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { auth } = require("express-openid-connect");
const postRoute = require("./routes/posts");

const app = express();
app.use(cors());

const PORT = 3030;

//middleware
app.use(express.json());

//address for rest API
app.use("/api/posts", postRoute);

const atlasUri = process.env.ATLAS_URI;

mongoose.connect(atlasUri);

const connection = mongoose.connection;
connection.once("open", () => console.log("Database connection successful🍃"));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} 🚀`);
});

module.exports = app;