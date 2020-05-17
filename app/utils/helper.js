/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 3/20/19
 * Time: 10:37 AM
 */

/**
 * @isJson
 * @param {String} item
 * @return {boolean} boolean
 */
const isJson = (item) => {
  item = typeof item !== 'string' ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  return typeof item === 'object' && item !== null;
};

const buildResponse = (status, payload) => {
  if (status === 'success') {
    return Promise.resolve({
      status: 'success', message: 'Success', statusCode: 200, ...payload
    });
  }
  const errMsg = payload.type === 'validationError'
    ? {
      status: 'fail', statusCode: 400, message: 'validationError', ...payload.errors
    }
    : { status: 'fail', statusCode: 500, message: payload.message };
  return Promise.reject(errMsg);
};

const queryFilters = (req) => {
  const { query } = req;
  const queryKeys = Object.keys(query);

  const filter = {};
  if (queryKeys.length) {
    const ignore = [
      'limit',
      'offset',
      'startDate',
      'endDate',
    ];
    queryKeys.forEach((key) => {
      if (!ignore.includes(key)) filter[key] = query[key];
    });
  }
  return filter;
};


module.exports = {
  isJson,
  buildResponse,
  queryFilters
};
