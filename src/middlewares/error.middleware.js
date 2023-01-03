const httpStatus = require("http-status");
const sequelize = require("sequelize");

const config = require("../api/config/validation.config");
const ApiError = require("../utils/class/ApiError");

/**
 * Handle Sequelize errors
 *
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @return {Error|ApiError} The error object, or a custom ApiError if the error is a Sequelize error
 */
const sequelizeErrorHandler = (err, req) => {
  // Check for sequelize errors
  if (!(err instanceof sequelize.Error)) {
    return err;
  }

  // Validation errors
  if (err instanceof sequelize.ValidationError) {
    return new ApiError(
      httpStatus.BAD_REQUEST,
      err.errors.shift().message,
      true,
      err.stack
    );
  }

  // Database errors
  if (err instanceof sequelize.DatabaseError) {
    return new ApiError(httpStatus.BAD_REQUEST, err.message, true, err.stack);
  }

  return err;
};

/**
 * Convert non-ApiError errors into ApiError instances
 *
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {function} next - The next middleware function
 */
const errorConverter = (err, req, res, next) => {
  let error = err;

  // Check if the error is sequelize related
  error = sequelizeErrorHandler(error, req);

  // ApiError conversion
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 *
 *  Handle errors thrown during the processing of an HTTP request
 *  Error message is hidden and a generic message is sent to the client in production
 *  Error and its stack trace are logged to the console in development
 *
 *  @param {Error} err - the error that was thrown
 *  @param {Object} req - the request object
 *  @param {Object} res - the response object
 *  @param {function} next - the next middleware function in the chain
 */
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  // Hiding error information in production
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  // Response contruction from error information
  const response = {
    code: statusCode,
    message: message,
    ...(config.env !== "production" && { stack: err.stack }),
  };

  // Log error in development environment
  if (config.env === "development") {
    console.log(err);
  }

  res.status(statusCode).send(response);
};

module.exports = { errorConverter, errorHandler };
