const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const cards = require("./routes/cards");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  req.user = {
    _id: "64475124f70b70d379c6e4f3",
  };

  next();
});

app.use("/users", users);
app.use("/cards", cards);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
