const mongoose = require("mongoose");
const { ERROR_BAD_REQUEST, SERVER_ERROR } = require("./config");

function checkErrors(err, res) {
  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    res
      .status(ERROR_BAD_REQUEST)
      .send({ message: "Сlient sent an invalid request" });
  } else {
    res.status(SERVER_ERROR).send({ message: "На сервере произошла ошибка" });
  }
}

module.exports = { checkErrors };
