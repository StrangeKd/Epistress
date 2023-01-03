/**
 * Custom error class for API errors
 *
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  /**
   * Create an instance of ApiError
   *
   * @param {number} statusCode - The HTTP status code of the error
   * @param {string} message - The error message
   * @param {Object} [errors=null] - Additional details about the error, such as validation errors
   * @param {boolean} [isOperational=true] - A flag indicating whether the error is operational or programming error
   * @param {string} [stack=""] - The error stack trace
   * @memberof ApiError
   */
  constructor(
    statusCode,
    message,
    errors = null,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
