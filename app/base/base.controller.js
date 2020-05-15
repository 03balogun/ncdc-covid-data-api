/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 3/19/19
 * Time: 6:25 PM
 */

const { queryFilters } = require('../utils/helper');

/**
 *  @BaseController
 */
class BaseController {
  /**
   * @constructor
   * @param {String} moduleName
   * @param {Object} moduleService
   */
  constructor ({ moduleName, moduleService }) {
    this.moduleName = moduleName;
    this.moduleService = moduleService;
  }

  /**
   * @getById
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<*>} res
   */
  async getById (req, res) {
    try {
      const { id } = req.params;
      const result = await this.moduleService.getById(id);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  /**
   * @getAll
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<*>} res
   */
  async getAll (req, res) {
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    const filter = queryFilters(req);
    try {
      const result = await this.moduleService.getAll(filter, limit, offset);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  /**
   * @store
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<*>} promise
   */
  async store (req, res) {
    try {
      const result = await this.moduleService.store(req.body);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  /**
   * @destroy
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<*>} promise
   */
  async destroy (req, res) {
    try {
      const result = await this.moduleService.destroy({ _id: req.body.id });
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  /**
   * @destroy
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<*>} promise
   */
  async update (req, res) {
    try {
      const result = await this.moduleService.update(req.params.id, req.body);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }
}

module.exports = BaseController;
