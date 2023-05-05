const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get(
  "/:userId",
  celebrate({
    params: Joi.object()
      .keys({
        userId: Joi.string().hex().length(24).required(),
      })
      .unknown(true),
  }),
  getUser
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
      })
      .unknown(true),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().pattern(
          /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*[\w.,@?^=%&:\/~+#-])*\/?/
        ),
      })
      .unknown(true),
  }),
  updateAvatar
);

module.exports = router;
