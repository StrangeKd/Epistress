const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../config/db.config");

/**
 * Define the User model
 *
 * @typedef {Object} user
 * @property {string} id - The user's unique identifier
 * @property {string} username - The user's username
 * @property {string} password - The user's password
 * @param {sequelize} sequelize - The Sequelize instance
 * @param {DataTypes} DataTypes - The Sequelize DataTypes object
 * @returns {Model} The User model
 */
const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

/**
 * Hash user's password
 *
 * @param {User} user - The user object
 * @param {Object} options - The Sequelize options object
 * @returns {User} The modified user object with the hashed password
 */
const hashPassword = async (user, options) => {
  if (!user.password) {
    return user;
  }
  let salt = bcrypt.genSaltSync(10);
  user.password = await bcrypt.hash(user.password, salt);
  return user;
};

User.addHook("beforeCreate", hashPassword);
User.addHook("beforeUpdate", hashPassword);

/**
 * Validate user's password
 *
 * @param {string} password - The password to validate
 * @returns {boolean} True if the password is valid, false otherwise
 */
User.prototype.validatePassword = async function (password) {
  const user = User.build({ password: this.password });
  return bcrypt.compare(password, user.password);
};

/**
 * Return user object without the password
 *
 * @returns {Object} The modified user object
 */
User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;
