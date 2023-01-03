const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

/**
 * Define the Status enum model
 *
 * @typedef {Object} task
 * @property {string} id - The status unique identifier
 * @property {string} status - The status type
 * @param {sequelize} sequelize - The Sequelize instance
 * @param {DataTypes} DataTypes - The Sequelize DataTypes object
 * @returns {Model} The Status model
 */
const Status = sequelize.define(
  "enum_statuses",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Status;
