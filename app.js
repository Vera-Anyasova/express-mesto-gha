const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const cards = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

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
    _id: "643bd62f1e6783623a6a7071",
  };

  next();
});

app.use("/users", users);
app.use("/cards", cards);

app.use("*", (req, res) => {
  res.status(500).send({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
