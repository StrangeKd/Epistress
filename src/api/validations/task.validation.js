const Joi = require("joi");

// Validation schema for creating a new task
const createTask = {
  params: Joi.object().keys({
    id_user: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    due_date: Joi.date(),
  }),
};

// Validation schema for showing a task
const showTask = {
  params: Joi.object().keys({
    id_task: Joi.string().required(),
  }),
};

// Validation schema for listing tasks
const listTasks = {
  body: Joi.object().keys({
    query: Joi.object(),
    options: Joi.object().keys({
      include: Joi.array().items(Joi.string()),
      order: Joi.array(),
    }),
  }),
};

// Validation schema for updating a task
const updateTask = {
  params: Joi.object().keys({
    id_task: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      due_date: Joi.date(),
    })
    .min(1),
};

// Validation schema for deleleting a task
const deleteTask = {
  params: Joi.object().keys({
    id_task: Joi.string().required(),
  }),
};

module.exports = {
  createTask,
  showTask,
  listTasks,
  updateTask,
  deleteTask,
};
