const { celebrate, Joi } = require("celebrate");
const { cardValidation } = require("../middlewares/validation");
const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

router.get("/", getCards);

router.post("/", cardValidation, createCard);

router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().alphanum().length(24),
      })
      .unknown(true),
  }),
  deleteCard
);

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().alphanum().length(24),
      })
      .unknown(true),
  }),
  addLike
);

router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().alphanum().length(24),
      })
      .unknown(true),
  }),
  removeLike
);

module.exports = router;
