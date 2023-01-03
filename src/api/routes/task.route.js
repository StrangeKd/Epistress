const { Router } = require("express");

const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const taskController = require("../controllers/task.controller");
const taskValidation = require("../validations/task.validation");

const router = Router();

// define POST route that calls createTask method
router.route("/").post(auth, validate(taskValidation.createTask), taskController.createTask);
// define GET route that calls showTask method
router.route("/:id").get(auth, validate(taskValidation.showTask), taskController.showTask);
// define POST route that calls listTasks method
router.route("/list").post(auth, validate(taskValidation.listTasks), taskController.listTasks);
// define PUT route that calls updateTask method
router.route("/:id").patch(auth, validate(taskValidation.updateTask), taskController.updateTask);
// define DELETE route that calls deleteTask method
router.route("/:id").delete(auth, validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;
