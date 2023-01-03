const Joi = require("joi");

// Validation schema for user registration
const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// Validation schema for user login
const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// Validation schema for getting a user by ID
const getUser = {
  params: Joi.object().keys({
    id_user: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  getUser,
};
