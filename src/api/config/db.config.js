const { Sequelize } = require("sequelize");
const config = require("./validation.config");

// construct the database url
const databaseUrl = `postgres://${config.sequelize.user}:${config.sequelize.password}@${config.sequelize.host}:${config.sequelize.port}/${config.sequelize.database}`;

// create a new sequelize instance with the appropriate database url
const sequelize = new Sequelize(databaseUrl, {
  // set the timezone
  timezone: "+01:00",

  // disable logging
  logging: false,

  // define options for the model definitions
  define: {
    // don't change table names
    freezeTableName: true,

    // use the specified column names for the createdAt and updatedAt timestamps
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelize;
