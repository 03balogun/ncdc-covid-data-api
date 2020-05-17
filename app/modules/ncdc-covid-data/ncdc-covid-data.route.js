const router = require('express').Router();

const ncdcCovidDataController = require('./ncdc-covid-data.controller');

router.get('/epicurve-by-date', (req, res) => ncdcCovidDataController
  .getEpicurveGroupByDate(req, res));

router.get('/epicurve-by-state', (req, res) => ncdcCovidDataController
  .getEpicurveForState(req, res));

module.exports = router;
