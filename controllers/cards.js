const Card = require("../models/card");
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Сlient sent an invalid request" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Something went wrong" });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Сlient sent an invalid request" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Something went wrong" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, { new: true })
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === "Not found") {
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
      if (err.name === "ValidationError") {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Сlient sent an invalid request" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Something went wrong" });
      }
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
      if (err.name === "ValidationError") {
        res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Сlient sent an invalid request" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Something went wrong" });
      }
    });
};
