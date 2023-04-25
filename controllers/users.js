const mongoose = require("mongoose");
const User = require("../models/user");
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: "User not found" });
      }
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
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
        res.status(200).send({ data: user });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: "User not found" });
      }
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.updateAvatar = (req, res) => {
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
        res.status(200).send({ data: user });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: "User not found" });
      }
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

function checkErrors(err, res) {
  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    res
      .status(ERROR_BAD_REQUEST)
      .send({ message: "Сlient sent an invalid request" });
  } else {
    res.status(SERVER_ERROR).send({ message: "Something went wrong" });
  }
}
