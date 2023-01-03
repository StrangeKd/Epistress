const catchAsync = require("../../utils/catchAsync");
const dbService = require("../services/db.service");
const taskService = require("../services/task.service");

const Task = require("../models/task.model");

const messages = {
  DELETE: "Task deleted",
};
/**
 * Create a new task
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createTask = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { title, description } = req.body;
  const date = new Date();

  const task = await taskService.addTask(userId, title, description, date);

  res.send(task);
});

/**
 * Show task with the given ID
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const showTask = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  const task = await taskService.getTask(taskId);

  res.send(task);
});

/**
 * List all tasks that match the filters if specified
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const listTasks = catchAsync(async (req, res) => {
  const query = req.body.query || {};
  const options = req.body.options || {};

  const tasks = await taskService.getAllTasks(query, options);

  res.send(tasks);
});

/**
 * Update task by ID
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updateTask = catchAsync(async (req, res) => {
  const dataToUpdate = req.body;
  const query = {
    id: {
      $eq: req.params.userId,
    },
  };
  const task = await taskService.updateTask(query, dataToUpdate);
  res.send(task);
});

/**
 * Delete task by id
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.send(messages.DELETE);
});

module.exports = {
  createTask,
  showTask,
  listTasks,
  updateTask,
  deleteTask,
};
