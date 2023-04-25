const User = require("../models/user");
const { checkErrors } = require("../handleErrors");
const { ERROR_NOT_FOUND } = require("../constants");

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
