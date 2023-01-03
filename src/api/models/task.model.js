const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.config");

const User = require("./user.model");
const Status = require("./enum.status.model");

/**
 * Define the Task model
 *
 * @typedef {Object} task
 * @property {string} id - The task's unique identifier
 * @property {string} title - The task's title
 * @property {string} description - The task's description
 * @property {Date} due_date - The task's due date
 * @param {sequelize} sequelize - The Sequelize instance
 * @param {DataTypes} DataTypes - The Sequelize DataTypes object
 * @returns {Model} The Task model
 */
const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  due_date: {
    type: DataTypes.DATEONLY,
  },
});

User.hasMany(Task, { foreignKey: "id_user" });
Status.hasMany(Task, { foreignKey: "id_status" });

module.exports = Task;
