/**
 *  Extract specified properties from an object
 *
 *  @param {Object} object - The object to pick properties from
 *  @param {Array} keys - The keys of the properties to pick
 *  @returns {Object} - An object containing only the properties with the specified keys
 */
const extractProperties = (object, keys) => {
  // Reduce the keys array to a new object containing only the specified keys from the original object
  return keys.reduce((obj, key) => {
    // If the key exists in the original object, add it to the new object
    if (key in object) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = extractProperties;
