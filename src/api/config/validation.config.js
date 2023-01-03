const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const envSchema = Joi.object()
  .keys({
    // app config
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),

    // database config
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    // test database config
    TEST_DB_USER: Joi.string().required(),
    TEST_DB_PASSWORD: Joi.string().required(),
    TEST_DB_NAME: Joi.string().required(),

    // jwt config
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRE_MINUTES: Joi.string().default(30),
    JWT_REFRESH_EXPIRE_DAYS: Joi.string().default(1),
  })
  .unknown();

const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  // app config
  env: env.NODE_ENV,
  port: env.PORT,

  sequelize: {
    // database config
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,

    // test database config
    testUser: env.TEST_DB_USER,
    testPassword: env.TEST_DB_PASSWORD,
    testDatabase: env.TEST_DB_NAME,
  },

  // jwt config
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRE_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRE_DAYS,
  },
};

module.exports = config;
