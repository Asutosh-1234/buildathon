// this is the standard format for this application to send the errors where we will use that

class ApiError extends Error {
  constructor(statusCode, massage = "Internal Error", errors = [], stack = "") {
    super(massage);
    this.statusCode = statusCode;
    this.data = null;
    this.massage = massage;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
