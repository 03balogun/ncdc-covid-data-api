const BaseController = require('../../base/base.controller');
const ncdcService = require('./ncdc-covid-data.service');

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
      const result = await this.moduleService.getEpicurveGroupByDate(req.query);
      return res.status(result.statusCode).send(result);
    } catch (error) {
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
      const result = await this.moduleService.getEpicurveForState();
      return res.status(result.statusCode).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }
}

module.exports = new NcdcCovidDataController();
