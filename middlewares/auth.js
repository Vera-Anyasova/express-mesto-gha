const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  // req.user = payload;
  req.user = { _id: payload._id };
  console.log(req.user);
  // console.log(payload);

  next();
};
