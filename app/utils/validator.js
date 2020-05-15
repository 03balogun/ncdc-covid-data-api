const Validator = require('validatorjs');


// return split field name before returning them in error message
Validator.setAttributeFormatter(attribute => attribute.replace(/([A-Z])/g, ' $1')
  .toLocaleLowerCase());

/**
 * @validator
 * @param {Object} body
 * @param {Object} rules
 * @param {Object} customMessages
 * @return {Promise<*>} Promise
 */
const validator = async (body, rules, customMessages) => new Promise(((resolve, reject) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => resolve(true));
  const { errors } = validation;
  const errorObject = { type: 'validationError', errors };
  validation.fails(() => reject(errorObject));
}));

module.exports = validator;
