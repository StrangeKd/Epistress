const DataTypes = require("sequelize");

const sequelize = require("../config/db.config");

const User = require("./user.model");

/**
 * Define the Token model
 *
 * @typedef {Object} token
 * @property {string} token - The token value
 * @property {date} expires - The expiration date of the token
 * @param {sequelize} sequelize - The Sequelize instance
 * @param {DataTypes} DataTypes - The Sequelize DataTypes object
 * @returns {Model} The Token model
 */
const Token = sequelize.define("tokens", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(Token, { foreignKey: "id_user" }); // TODO: hasMany to hasOne if deleting refreshToken on login

module.exports = Token;
