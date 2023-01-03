const rateLimit = require("express-rate-limit");

/**
 * Middleware function to limit the number of requests that a client can make
 * @param {Object} options the options for the rate limiter
 * @returns {function} the rate limiter middleware function
 */
const rateLimiter = rateLimit({
  // The time window in which the limit applies, in milliseconds
  windowMs: 15 * 60 * 1000,

  // The maximum number of requests that a client can make in the time window
  max: 20,

  // Whether to skip successful requests
  skipSuccessfulRequests: true,
});

module.exports = rateLimiter;
