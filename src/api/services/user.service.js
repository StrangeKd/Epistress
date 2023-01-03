const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");
const dbService = require("./db.service");

const User = require("../models/user.model");

const messages = {
  NOT_FOUND: "Not Found",
  USERNAME: "Wrong username",
  PASSWORD: "Wrong password",
};

/**
 * Try to log the user with username and password
 *
 * @param {string} username
 * @param {string} password
 * @returns {object} user object if the login is successful
 * @throws {ApiError} if the provided username does not exist or the password is incorrect
 */
const login = async (username, password) => {
  // Try to find the user in the database using the provided username
  const user = await dbService.findOne(User, { username: username });
  // If the user is not found, throw an error
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, messages.USERNAME);
  }

  // Check if the provided password is valid for the user
  const isValid = await user.validatePassword(password);
  // If the password is not valid, throw an error
  if (!isValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, messages.PASSWORD);
  }

  return user;
};

/**
 * Get user data
 *
 * @param {string} userId
 * @returns {object} user object if found
 * @throws {ApiError} if the user is not found in the database
 */
const getUser = async (userId) => {
  // Try to find the user in the database using the provided ID
  const user = await dbService.findOne(User, { id: userId });
  // If the user is not found, throw an error
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.NOT_FOUND);
  }

  return user;
};

module.exports = {
  login,
  getUser,
};
