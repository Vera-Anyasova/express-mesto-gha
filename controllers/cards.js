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
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("Карточка не найдена");
    })
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        res.send({ data: card });
      } else {
        throw new ForbiddenError("Нет прав доступа");
      }
    })
    .catch((err) => {
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
