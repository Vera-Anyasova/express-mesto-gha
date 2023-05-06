const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { NotFoundError, ConflictError } = require("../utils/errors");

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Указанный email уже существует"));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, "secret", {
          expiresIn: "7d",
        }),
      });
    })
    .catch(next);
};
// console.log(user);

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const payload = { _id: user._id };
//       const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       res
//         .cookie("jwt", token, {
//           maxAge: 3600000 * 24 * 7,
//           httpOnly: true,
//           sameSite: true,
//         })
//         .res.status(200)
//         .send({ email });
//     })
//     .catch(next);
// };

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      console.log(req.user);
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError("Нет пользователя с таким id");
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError("Нет пользователя с таким id");
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: userId },
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError("Нет пользователя с таким id");
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(
    { _id: userId },
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError("Нет пользователя с таким id");
      }
    })
    .catch(next);
};
