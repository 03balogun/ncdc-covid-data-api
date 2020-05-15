/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 3/19/19
 * Time: 6:25 PM
 */
const { validator } = require('../../config');
const { buildResponse } = require('../utils/helper');

/**
 * @CoreServices
 */
class CoreServices {
  /**
   * @constructor
   * @param {Object} model
   * @param {Object} validationRules
   */
  constructor (model, validationRules) {
    this.model = model;
    this.validatonRules = validationRules;
    this.validator = validator;
  }

  /**
   * @store
   * @param {Object} data
   * @return {Promise<{status: string, data}>} Promise
   */
  async store (data) {
    try {
      const { rules, customMessages } = this.validatonRules.store;
      await validator(data, rules, customMessages);
      const result = await this.model.create(data);
      return buildResponse('success', { data: result });
    } catch (error) {
      return buildResponse('fail', error);
    }
  }

  /**
   * @getById
   * @param {String} id
   * @return {Promise<*>} Promise
   */
  async getById (id) {
    try {
      const { rules, customMessages } = this.validatonRules.getById;
      await validator({ id }, rules, customMessages);
      const result = await this.model.findById(id);
      return buildResponse('success', { data: result });
    } catch (error) {
      return buildResponse('fail', error);
    }
  }

  /**
   * @getAll
   * @param {Object} query
   * @param {Number} limit
   * @param {Number} offset
   * @return {Promise<>} Promise
   */
  async getAll (query = {}, limit = 10, offset = 0) {
    try {
      const result = await this.model.find(query)
          .limit(limit)
          .skip(offset);

      const total = await this.model.countDocuments(query);

      return buildResponse('success', {
        limit, offset, query, total, data: result
      });

    } catch (error) {
      return buildResponse('fail', error);
    }
  }

  /**
   * @getOne
   * @param {Object} query
   * @param {Object} select
   * @return {Promise<>} Promise
   */
  async getOne (query = {}, select = {}) {
    try {
      const result = await this.model.findOne(query, {}, select);
      return buildResponse('success', { data: result });
    } catch (error) {
      return buildResponse('fail', error);
    }
  }

  /**
   * @destroy
   * @param {Object} query
   * @return {Promise<>} Promise
   */
  async destroy (query) {
    try {
      const { rules, customMessages } = this.validatonRules.destroy;

      await validator(query, rules, customMessages);

      const result = await this.model.findOneAndDelete(query);

      return buildResponse('success', { data: result });

    } catch (error) {
      return buildResponse('fail', error);
    }
  }

  /**
   * @update
   * @param {String} id
   * @param {Object} data
   * @return {Promise<>} Promise
   */
  async update (id, data) {
    try {
      const { rules, customMessages } = this.validatonRules.update;
      await validator({ id, ...data }, rules, customMessages);
      const result = await this.model.findOneAndUpdate(id, data, { upsert: true, new: true });
      return buildResponse('success', { data: result });
    } catch (error) {
      return buildResponse('fail', error);
    }
  }
}

module.exports = CoreServices;
