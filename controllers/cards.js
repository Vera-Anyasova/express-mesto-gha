const mongoose = require("mongoose");
const Card = require("../models/card");
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(ERROR_NOT_FOUND).send({ message: "Card not found" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Something went wrong" });
      }
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: "Card not found" });
      }
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: "Card not found" });
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
