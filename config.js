const { PORT = 3000 } = process.env;
const { DB_CONNECT = "mongodb://127.0.0.1:27017/mestodb" } = process.env;
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports = {
  PORT,
  DB_CONNECT,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  SERVER_ERROR,
};
