const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const dbService = require("../services/db.service");
const config = require("./validation.config");
const catchAsync = require("../../utils/catchAsync");

const User = require("../models/user.model");

// Define the options for the JWT strategy
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/**
 * Verify callback for JWT strategy
 * Finds user by ID in JWT payload and returns user or false
 *
 * @param {object} payload - JWT payload containing the user ID
 * @param {function} done - Callback function to call with the user or false
 * @throws {Error} If there is an error finding the user in the database
 */
const jwtVerify = catchAsync(async (payload, done) => {
  const user = await dbService.findOne(User, {
    id: payload.sub,
  });
  if (!user) {
    return done(null, false);
  }
  done(null, user);
});

// Create a new JWT strategy using the options and verify callback
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = jwtStrategy;
