const Card = require("../models/card");
const { NotFoundError } = require("../utils/errors");
const { ForbiddenError } = require("../utils/errors");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(
    req.params.cardId,
    { _id: req.user._id },
    { new: true }
  )
    .populate("owner")
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError("Карточка не найдена");
      }
    })
    .catch((err) => {
      if (err.name === "ForbiddenError") {
        next(new ForbiddenError("Нет прав доступа"));
      }
      next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError("Карточка не найдена");
      }
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError("Карточка не найдена");
      }
    })
    .catch(next);
};
