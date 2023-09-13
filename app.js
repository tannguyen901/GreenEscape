const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose
  .connect("mongodb://localhost:27017/greenEscape", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("Error, MONGO CONNECTION!!!!");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("hello from yelpcamp");
});

app.get("/makeCampground", async (req, res) => {
  const newCampground = new Campground({
    title: "backyard",
    description: "free camping",
  });
  newCampground.save();
  res.send(newCampground);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
