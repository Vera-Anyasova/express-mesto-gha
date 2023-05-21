const router = require("express").Router();
const users = require("./users");
const cards = require("./cards");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/not-found-error");

router.post("/signup", registerValidation, createUser);
router.post("/signin", loginValidation, login);

router.use("/users", auth, users);
router.use("/cards", auth, cards);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

module.exports = router;
