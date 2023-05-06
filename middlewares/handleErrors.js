const mongoose = require("mongoose");
const { GeneralError, BadRequestError } = require("../utils/errors");

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.checkError()).send({
      status: "error",
      message: err.message,
    });
  }

  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    res
      .status(BadRequestError)
      .send({ message: "Сlient sent an invalid request" });
  }

  return res.status(500).send({
    status: "error",
    message: "На сервере произошла ошибка",
  });
};

module.exports = handleErrors;
