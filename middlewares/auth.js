const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "secret");
  } catch (err) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = { _id: payload._id };

  next();
};
