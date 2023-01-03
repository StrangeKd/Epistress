/**
 * Wrap middleware to catch potential errors
 * @param {function} middleware - the middleware to wrap
 * @returns a middleware that knows how to handle errors
 */
const catchAsync = (middleware) => {
  return (req, res, next) => {
    // call the middleware and catch any errors that it throws
    Promise.resolve(middleware(req, res, next)).catch((err) => next(err));
  };
};

module.exports = catchAsync;
