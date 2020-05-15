const BaseService = require('../../base/base.service');
const ncdcModel = require('./ncdc-covid-data.model');
const ncdcValidationRules = require('./ncdc-covid-data.validation');
const { buildResponse } = require('../../utils/helper');

/**
 * @ncdcServices
 */
class ncdcCovidDataServices extends BaseService {
  /**
   * @constructor
   */
  constructor () {
    super(ncdcModel, ncdcValidationRules);
  }

  /**
   * @description getEpicurveGroupByDate
   * @param {Object} query
   * @return {Promise<void>} Object
   */
  async getEpicurveGroupByDate (query = {}) {
    try {
      const { rules, customMessages } = this.validatonRules.totalMetricsGroupByDate;
      await this.validator(query, rules, customMessages);
      const pipeline = [
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$report_date' } },
            // total: { $sum: { $add: ['$total_confirmed_cases', '$total_deaths'] } },
            total_confirmed_cases: { $sum: '$total_confirmed_cases' },
            total_discharged: { $sum: '$total_discharged' },
            total_deaths: { $sum: '$total_deaths' },
            total_active_cases: { $sum: '$total_active_cases' },
          },
        },
        { $sort: { _id: -1 } }
      ];

      if (query.state) {
        pipeline.unshift({
          $match: { state: { $eq: query.state.toLowerCase() } }
        });
      }

      const result = await this.model.aggregate(pipeline);

      result.reduce((acc, cur, idx) => {
        if (acc) {
          const total_confirmed_cases = cur.total_confirmed_cases - acc.total_confirmed_cases;
          const total_discharged = cur.total_discharged - acc.total_discharged;
          const total_deaths = cur.total_deaths - acc.total_deaths;

          const calc = {
            new_confirmed_cases: total_confirmed_cases || 0,
            new_discharged: total_discharged || 0,
            new_deaths: total_deaths || 0,
            // new_active: total_confirmed_cases - (total_discharged + total_deaths)
          };

          result[idx] = {
            ...result[idx],
            ...calc
          };

          // Get the next day
          return result[idx + 2];
        }
        return cur;
      }, result[1]);

      return buildResponse('success', { data: result });
    } catch (error) {
      return buildResponse('fail', error);
    }
  }

  cumulativeFigures () {
    return this.model.aggregate([{
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$report_date' } },
        total_confirmed_cases: { $sum: '$total_confirmed_cases' },
        total_discharged: { $sum: '$total_discharged' },
        total_deaths: { $sum: '$total_deaths' },
        total_active_cases: { $sum: '$total_active_cases' },
      },
    },
    { $sort: { _id: -1 } }, { $limit: 1 }]);
  }

  async getEpicurveForState () {
    const result = await this.model.aggregate([
      {
        $group: {
          _id: { $toString: '$state' },
          report_date: { $last: { $dateToString: { format: '%d-%m-%Y', date: '$report_date' } } },
          state: { $last: '$state' },
          total_confirmed_cases: { $last: '$total_confirmed_cases' },
          total_discharged: { $last: '$total_discharged' },
          total_deaths: { $last: '$total_deaths' },
          total_active_cases: { $last: '$total_active_cases' },
        },
      },
      {
        $sort: { total_confirmed_cases: -1 }
      }
    ]);

    // Get total figures
    const cumulative = (await this.cumulativeFigures())[0];
    cumulative.state = 'All';
    cumulative.report_date = cumulative._id;
    result.unshift(cumulative);

    return buildResponse('success', { data: result });
  }
}

module.exports = new ncdcCovidDataServices();
