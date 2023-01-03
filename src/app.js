const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const rateLimiter = require("./middlewares/limiter.middleware");
const {
  errorConverter,
  errorHandler,
} = require("./middlewares/error.middleware");

const jwtStrategy = require("./api/config/passport.config");
const config = require("./api/config/validation.config");
const routes = require("./api/routes");

// create express instance
const app = express();

// set security HTTP headers
app.use(helmet());

// enable compression
app.use(compression());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));

// parse json request body
app.use(bodyParser.json());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// apply rate limiter middleware to the '/users' route only if in production environment
if (config.env === "production") {
  app.use("/users", rateLimiter);
}

// use API Routes
app.use(routes);

// error handling
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
