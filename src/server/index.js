const { Nuxt, Builder } = require("nuxt");

const nuxtConfig = require("../../nuxt.config");
const sequelize = require("../api/config/db.config");
const config = require("../api/config/validation.config");

// Import the Express app
const app = require("../app");

/**
 * Initialize Nuxt.js and build the app in development mode
 *
 */
const initNuxt = async () => {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig);

  // Build only in dev mode
  if (config.env === "development") {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);
};

/**
 * Start the server and listen for incoming requests on the specified port and host
 *
 */
const startServer = async () => {
  /**
   * Start the server and listen for incoming requests on the specified port and host
   *
   */
  const server = app.listen(config.port, config.host, async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection to database established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
    console.log(`App listening on port ${config.port}`);
  });

  /**
   * Handle the exit event for the process and close the server if it is running
   *
   */
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  /**
   * Handle unexpected errors by logging the error and calling the `exitHandler` function
   *
   * @param {*} error - The error that occurred
   */
  const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
  };

  // Listen for uncaught exceptions and unhandled rejections
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  // Listen for the SIGTERM process event
  process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
      server.close();
    }
  });
};

/**
 * Initialize the app by initializing Nuxt and starting the server
 *
 */
const start = async () => {
  await initNuxt();
  await startServer();
};

start();
