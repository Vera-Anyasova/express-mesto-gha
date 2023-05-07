const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const cards = require("./routes/cards");
const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/users");
const handleErrors = require("./middlewares/handleErrors");
const { errors } = require("celebrate");
const { userValidation } = require("./middlewares/validation");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.post("/signup", userValidation, createUser);
app.post("/signin", userValidation, login);

app.use("/users", auth, users);
app.use("/cards", auth, cards);

app.use(errors());
app.use(handleErrors);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
