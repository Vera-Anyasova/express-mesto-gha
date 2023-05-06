const mongoose = require("mongoose");
const { GeneralError } = require("../utils/errors");

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.checkError()).send({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).send({
    status: "error",
    message: "На сервере произошла ошибка",
  });
};

module.exports = handleErrors;
