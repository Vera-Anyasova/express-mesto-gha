const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");

// const handleAuthError = (res) => {
//   res.status(401).send({ message: "Необходима авторизация" });
// };

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

  req.user = { _id: payload._id }; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

// const jwt = require("jsonwebtoken");
// const { UnauthorizedError } = require("../utils/errors");

// const extractBearerToken = (header) => {
//   return header.replace("Bearer ", "");
// };

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return next(new UnauthorizedError("Необходима авторизация"));
//   }

//   const token = extractBearerToken(authorization);

//   let payload;

//   try {
//     payload = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     next(new UnauthorizedError("Необходима авторизация"));
//   }

//  req.user = { _id: payload._id }; // записываем пейлоуд в объект запроса

//   next(); // пропускаем запрос дальше
// };

// const jwt = require("jsonwebtoken");
// const { UnauthorizedError } = require("../utils/errors");

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     throw new UnauthorizedError("Необходима авторизация");
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     next(new UnauthorizedError("Необходима авторизация"));
//   }

//   // req.user = payload;
//   req.user = { _id: payload._id };
//   console.log(req.user);
//   // console.log(payload);

//   next();
// };
