const Card = require("../models/card");
const NotFoundError = require("../utils/errors/not-found-error");
const ForbiddenError = require("../utils/errors/forbidden-error");
// const { NotFoundError, ForbiddenError } = require("../utils/errors");

const updateDataCard = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
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
  Card.findById({ _id: req.params.cardId })
    .orFail(() => {
      throw new NotFoundError("Карточка не найдена");
    })
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        return Card.deleteOne(card).then(() => res.send({ data: card }));
      } else {
        throw new ForbiddenError("Нет прав доступа");
      }
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  const updateData = { $addToSet: { likes: req.user._id } };
  updateDataCard(req, res, updateData, next);
};

module.exports.removeLike = (req, res, next) => {
  const updateData = { $pull: { likes: req.user._id } };
  updateDataCard(req, res, updateData, next);
};
