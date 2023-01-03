const passport = require("passport");

/**
 * Auth middleware that uses Passport to authenticate requests using the 'jwt' strategy
 * If authentication is successful, the authenticated user is set on the request object as 'req.user'
 * If authentication fails, an error is passed to the next middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const auth = () => {
  return async (req, res, next) => {
    // create a promise to handle the success or failure of authentication
    new Promise((resolve, reject) => {
      // use the jwt strategy to authenticate the user
      passport.authenticate("jwt", { session: false })(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
};

module.exports = auth;
