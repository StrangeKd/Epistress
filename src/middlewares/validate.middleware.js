const httpStatus = require("http-status");
const Joi = require("joi");

const ApiError = require("../utils/class/ApiError");
const extractProperties = require("../utils/extractProperties");

/**
 * Validate the request object using a provided schema
 *
 * @param {Object} schema - The validation schema to use for validating the request data
 * @returns {Function} - The middleware function that validates the request data based on the schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    // Extract relevant properties from the schema based on the properties in the request object
    const validSchema = extractProperties(schema, ["params", "query", "body"]);
    const dataToValidate = extractProperties(req, Object.keys(validSchema));

    // Compile the validation schema and validate the data
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(dataToValidate);

    // If data is invalid, return a BAD_REQUEST error
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    // If data is valid, assign the validated data to the request object then call the next middleware
    Object.assign(req, value);
    next();
  };
};

module.exports = validate;
