class GeneralError extends Error {
  constructor(message, type) {
    super(message);
    this.type = type;
  }

  checkError() {
    if (this instanceof BadRequestError) {
      return 400;
    }
    if (this instanceof UnauthorizedError) {
      return 401;
    }
    if (this instanceof ForbiddenError) {
      return 403;
    }
    if (this instanceof NotFoundError) {
      return 404;
    }
    if (this instanceof ConflictError) {
      return 409;
    }
  }
}

class BadRequestError extends GeneralError {}
class UnauthorizedError extends GeneralError {}
class ForbiddenError extends GeneralError {}
class NotFoundError extends GeneralError {}
class ConflictError extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
