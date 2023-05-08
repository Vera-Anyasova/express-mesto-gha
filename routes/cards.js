const router = require("express").Router();
const {
  cardValidation,
  cardIdValidation,
} = require("../middlewares/validation");

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

router.get("/", getCards);

router.post("/", cardValidation, createCard);

router.delete("/:cardId", cardIdValidation, deleteCard);

router.put("/:cardId/likes", cardIdValidation, addLike);

router.delete("/:cardId/likes", cardIdValidation, removeLike);

module.exports = router;
