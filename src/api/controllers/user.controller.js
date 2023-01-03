const catchAsync = require("../../utils/catchAsync");
const dbService = require("../services/db.service");
const tokenService = require("../services/token.service");

const User = require("../models/user.model");

/**
 * Register a new user
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const register = catchAsync(async (req, res) => {
  const data = req.body;

  const user = await dbService.create(User, data);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, ...tokens });
});

/**
 * Log in a user
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await userService.login(username, password);

  const tokens = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    ...tokens,
  });
});

/**
 * Return the user data of the authenticated user
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getUser = catchAsync(async (req, res) => {
  const userId = req.params.id;

  const user = await userService.getUser(userId);

  res.send(user);
});

module.exports = {
  register,
  login,
  getUser,
};
