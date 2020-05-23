const BaseController = require('../../base/base.controller');
const ncdcService = require('./ncdc-covid-data.service');
const CacheService = require('../../utils/cache.service');

const ttl = 60 * 60; // time to live - cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

/**
 * @ncdcController
 */
class NcdcCovidDataController extends BaseController {
  /**
   * @constructor
   */
  constructor () {
    const moduleDetails = { moduleName: 'ncdc', moduleService: ncdcService };
    super(moduleDetails);
  }

  /**
   * @description getEpicurveGroupByDate
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<void>} Object
   */
  async getEpicurveGroupByDate (req, res) {
    try {

      const storeFunction = async () => await this.moduleService.getEpicurveGroupByDate(req.query);

      const cacheResult = await cache.get(req.query.state || 'all', storeFunction);

      return res.status(cacheResult.statusCode).send(cacheResult);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  }


  /**
   * @description getEpicurveForState
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<void>} Object
   */
  async getEpicurveForState (req, res) {
    try {

      const storeFunction = async () => await this.moduleService.getEpicurveForState();

      const cacheResult = await cache.get( 'getEpicurveForState', storeFunction);

      return res.status(cacheResult.statusCode).send(cacheResult);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }

  async clearCache(req, res) {
    try {
      await cache.flush();
      return res.status(200).send({status: 'success', message: 'Succesfully clear cache'});
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new NcdcCovidDataController();
