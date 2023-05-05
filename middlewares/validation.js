const { celebrate, Joi } = require("celebrate");

const userValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*[\w.,@?^=%&:\/~+#-])*\/?/
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(),
});

const cardValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(
          /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*[\w.,@?^=%&:\/~+#-])*\/?/
        ),
    })
    .unknown(true),
});

module.exports = { userValidation, cardValidation };
