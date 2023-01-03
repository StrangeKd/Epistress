const { Router } = require("express");

const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const userController = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");

const router = Router();

// define POST route for /users/register that calls register method of users controller
router.route("/register").post(validate(userValidation.register), userController.register);
// define POST route for /users/login that calls login method of users controller
router.route("/login").post(validate(userValidation.login), userController.login);
// define GET route for /users that calls getUser method of users controller
router.route("/").get(auth, validate(userValidation.getUser), userController.getUser);

module.exports = router;
