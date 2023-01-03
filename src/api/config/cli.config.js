const config = require("./validation.config");

// Define the database configuration for each environment
const cliConfig = {
  production: {
    username: config.sequelize.user,
    password: config.sequelize.password,
    database: config.sequelize.database,
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: "postgres",
  },
  development: {
    username: config.sequelize.user,
    password: config.sequelize.password,
    database: config.sequelize.database,
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: "postgres",
  },
  test: {
    username: config.sequelize.testUser,
    password: config.sequelize.testPassword,
    database: config.sequelize.testDatabase,
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: "postgres",
  },
};

module.exports = cliConfig;
