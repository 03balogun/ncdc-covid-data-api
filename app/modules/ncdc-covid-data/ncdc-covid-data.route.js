const router = require('express').Router();

const ncdcCovidDataController = require('./ncdc-covid-data.controller');

const secretCheckMiddleware = (req, res, next) => {
    if (req.params.secret !== process.env.CACHE_SECRET) {
        return res.status(401).send({message: 'Invalid Secrete'});
    }
    next();
};


router.get('/epicurve-by-date', (req, res) => ncdcCovidDataController
  .getEpicurveGroupByDate(req, res));

router.get('/epicurve-by-state', (req, res) => ncdcCovidDataController
  .getEpicurveForState(req, res));

router.get('/clear-cache/:secret',secretCheckMiddleware,
    (req, res) => ncdcCovidDataController.clearCache(req, res));

module.exports = router;
