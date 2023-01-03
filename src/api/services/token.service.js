const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");

const ApiError = require("../../utils/class/ApiError");
const config = require("../config/validation.config");
const dbService = require("./db.service");

const Token = require("../models/token.model");

const messages = {
  NOT_FOUND: "Token not found",
};

/**
 * Generate JSON Web Token from userId
 * @param {String} userId - Id of the user who is generating the token
 * @param {Date} expires - Token expiration date
 * @param {String} secret - JWT secret
 * @returns Encrypted token
 */
const generateToken = (userId, expires, secret = config.jwt.secret) => {
  // payload sert à générer un token unique
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };

  return jwt.sign(payload, secret);
};

/**
 * Decrypt the JWT and return the token from the database
 * @param {Object} token - The JWT to decrypt
 * @returns Token from the database
 */
const verifyToken = async (token) => {
  // Decrypt the provided token to get the payload it contains
  const payload = jwt.verify(token, config.jwt.secret);

  // Get the token from the database
  const foundToken = await dbService.findOne(Token, {
    token: token,
    user: payload.sub,
  });

  if (!foundToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, messages.NOT_FOUND);
  }

  return foundToken;
};

/**
 * Generate a pair of token
 * @param {User} user - the user found in the database
 * @returns an object containing an access and a refresh token
 */
const generateAuthTokens = async (user) => {
  // Generate an accessToken
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(user.id, accessTokenExpires);

  // Generate a refreshToken
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(user.id, refreshTokenExpires);

  // Save the refreshToken in the database
  await dbService.create(Token, {
    token: refreshToken,
    id_user: user.id,
    expires: refreshTokenExpires,
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = { verifyToken, generateAuthTokens };
