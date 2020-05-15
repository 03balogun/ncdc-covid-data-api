const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Facilitate connection to database
 * @param {String} url mongodb connection url
 * @return {*} log to show success or failure of connection
 */
exports.connect = function (url) {
  mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
      logger.log('database successfully connected');
    })
    .catch((err) => {
      logger.error(`database connection failure: \n ${err.stack}`);
    });
};
