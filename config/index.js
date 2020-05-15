const database = require('./database');
const environment = require('./environment');
const validator = require('../app/utils/validator');

module.exports = {
  environment,
  database,
  validator
};
