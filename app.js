const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const cards = require("./routes/cards");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
