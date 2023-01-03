const httpStatus = require("http-status");

const ApiError = require("../../utils/class/ApiError");
const dbService = require("./db.service");

const Task = require("../models/task.model");

const messages = {
  NOT_FOUND: "Not Found",
  SERVER_ERROR: "Server Error Occured",
  PASSWORD: "Wrong password",
};

/**
 * Add a new task to the database
 *
 * @param {string} userId - ID of the user who is adding the task
 * @param {string} title - Title of the task
 * @param {string} description - The description of the task
 * @param {date} date - The due date of the task
 * @returns {object} task - The newly created task object
 * @throws {ApiError} If there is an error creating the task in the database
 */
const addTask = async (userId, title, description, date) => {
  const task = await dbService.create(Task, {
    id_user: userId,
    title: title,
    description: description,
    due_date: date,
  });

  if (!task) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR);
  }

  return task;
};

/**
 * Retrieve a task from the database by its id
 *
 * @param {string} taskId - ID of the task
 * @returns {object} task - Task object
 * @throws {ApiError} If the task is not found in the database
 */
const getTask = async (taskId) => {
  const task = await dbService.findOne(Task, { id: taskId });

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.NOT_FOUND);
  }

  return task;
};

/**
 * Retrieve all tasks from the database that match query
 *
 * @param {object} query - Query to filter the tasks by
 * @param {object} options - Options for the query
 * @returns {array} tasks - An array of task objects
 * @throws {ApiError} If no tasks are found in the database
 */
const getAllTasks = async (query, options) => {
  const tasks = await dbService.findAll(Task, query, options);

  if (!tasks) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.NOT_FOUND);
  }

  return tasks;
};

/**
 * Update a task in the database
 *
 * @param {object} query - Query to filter the tasks by
 * @param {object} data - Data to update the task with
 * @returns {object} task - The updated task object
 * @throws {ApiError} If there is an error updating the task in the database
 */
const updateTask = async (query, data) => {
  const task = await dbService.update(Task, query, data);

  if (!task) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR);
  }

  return task;
};

/**
 * Delete a task from the database by its id
 *
 * @param {string} taskId - ID of the task
 * @returns {object} task - The deleted task object
 * @throws {ApiError} If there is an error deleting the task from the database
 */
const deleteTask = async (taskId) => {
  const task = await dbService.deleteById(Task, taskId);

  if (!task) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR);
  }

  return task;
};

module.exports = {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
