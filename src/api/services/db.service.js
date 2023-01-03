const { Op } = require("sequelize");

const OPERATORS = [
  "$contains",
  "$and",
  "$or",
  "$like",
  "$in",
  "$eq",
  "$gt",
  "$lt",
  "$gte",
  "$lte",
  "$any",
  "$between",
];

/**
 * Recursively parse the data object
 * and replace operator keys with their equivalent from the Op object
 *
 * @param {Object} data - The data object to parse
 * @return {Object} The parsed data object
 */
const queryBuilderParser = (data) => {
  if (data) {
    Object.entries(data).forEach(([key]) => {
      if (typeof data[key] === "object") {
        queryBuilderParser(data[key]);
      }
      if (OPERATORS.includes(key)) {
        const opKey = key.replace("$", "");
        data[Op[opKey]] = data[key];
        delete data[key];
      } else if (key === "$ne") {
        data[Op.not] = data[key];
        delete data[key];
      } else if (key === "$nin") {
        data[Op.notIn] = data[key];
        delete data[key];
      }
    });
  }

  return data;
};

/**
 * Create a new record in the specified model
 *
 * @param {Model} model - The model to create the record in
 * @param {Object} data - The data to use for the new record
 * @return {Promise} A promise that resolves to the created record
 */
const create = async (model, data) => {
  const result = await model.create(data);
  return result;
};

/**
 * Create multiple records in the specified model
 *
 * @param {Model} model - The model to create the records in
 * @param {Array} data - An array of data to use for the new records
 * @param {Object} options - Options for the create operation
 * @param {Boolean} options.validate - Whether to validate the data before creating the records
 * @return {Promise} A promise that resolves to an array of the created records
 */
const createMany = async (model, data, options = { validate: true }) => {
  const results = await model.bulkCreate(data, options);
  return results;
};

/**
 * Update records in the specified model that match the query
 *
 * @param {Model} model - The model to update the records in
 * @param {Object} query - The query to use to find the records to update
 * @param {Object} data - The data to use to update the records
 * @return {Promise} A promise that resolves to an array of the updated records
 */
const update = async (model, query, data) => {
  query = queryBuilderParser(query);
  let results = await model.update(data, { where: query });
  results = await model.findAll({ where: query });
  return results;
};

/**
 * Find a single record in the specified model that matches the query
 *
 * @param {Model} model - The model to find the record in
 * @param {Object} query - The query to use to find the record
 * @param {Object} options - Options for the find operation
 * @param {Array} options.select - An array of attributes to select
 * @param {Array} options.include - An array of associations to include in the query
 * @return {Promise} A promise that resolves to the found record
 */
const findOne = async (model, query, options = {}) => {
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  return await model.findOne({
    where: query,
    ...options,
  });
};

/**
 * Find all records in the specified model that match the query
 *
 * @param {Model} model - The model to find the records in
 * @param {Object} query - The query to use to find the records
 * @param {Object} options - Pptions for the find operation
 * @param {Array} options.select - An array of attributes to select
 * @param {Object} options.sort - An object specifying the sort order
 * @param {Array} options.include - An array of associations to include in the query
 * @return {Promise} A promise that resolves to an array of the found records
 */
const findAll = async (model, query, options) => {
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.sort) {
    options.order = sortParser(options.sort);
    delete options.sort;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  options = {
    where: query,
    ...options,
  };
  return model.findAll(options);
};
/**
 * Delete record in the specified model by its ID
 *
 * @param {Model} model - The model to delete the record from
 * @param {Object} id - ID of the record to delete
 * @param {Object} options - Options for the delete operation
 * @return {Promise} A promise that resolves to an array of the deleted records
 */
const deleteById = async (model, id, options = {}) => {
  await model.destroy({
    where: { [model.primaryKeyField]: id },
    ...options,
  });
  const result = await findOne(
    model,
    { [model.primaryKeyField]: id },
    { paranoid: false }
  );
  return result;
};

/**
 * Delete records in the specified model that match the query
 *
 * @param {Model} model - The model to delete the records from
 * @param {Object} query - The query to use to find the records to delete
 * @param {Object} options - Options for the delete operation
 * @param {Boolean} options.force - Whether to force the delete operation, ignoring soft deletes
 * @return {Promise} A promise that resolves to an array of the deleted records
 */
const destroy = async (model, query, options) => {
  query = queryBuilderParser(query);
  const findOptions = {};
  const destroyOptions = {};

  if (options && options.force) {
    findOptions.paranoid = false;
    destroyOptions.force = true;
    delete options.force;
  }

  const results = await model.findAll({ where: query, ...findOptions });
  await model.destroy({ where: query, ...destroyOptions });
  return results;
};

module.exports = {
  create,
  createMany,
  update,
  findOne,
  findAll,
  deleteById,
  destroy,
};
