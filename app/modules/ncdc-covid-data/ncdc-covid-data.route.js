const router = require('express').Router();

const ncdcCovidDataController = require('./ncdc-covid-data.controller');

router.get('/epicurve-by-date', (req, res) => ncdcCovidDataController
  .getEpicurveGroupByDate(req, res));

router.get('/epicurve-by-state', (req, res) => ncdcCovidDataController
  .getEpicurveForState(req, res));

router.get('/', (req, res) => ncdcCovidDataController.view(req, res));
router.get('/:id', (req, res) => ncdcCovidDataController.getById(req, res));
router.post('/', (req, res) => ncdcCovidDataController.store(req, res));
router.put('/:id', (req, res) => ncdcCovidDataController.update(req, res));
router.delete('/', (req, res) => ncdcCovidDataController.destroy(req, res));

module.exports = router;
