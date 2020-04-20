/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const EstimateCtrl = require('../controllers');

router.get('/', EstimateCtrl.getHome);

router.get(/api\/v1/, (req, res, next) => {
  console.log('Passing through middleware!');
  req.comment = 'Passing through route';
  next();
});

router.get('/api/v1/on-covid-19/logs', EstimateCtrl.getLogs);

router.get('/logs', EstimateCtrl.getLogs);

router.get('/api/v1/on-covid-19', EstimateCtrl.getAll);

router.post('/api/v1/on-covid-19/', EstimateCtrl.addRecord);

router.post('/api/v1/on-covid-19/:tag', EstimateCtrl.addRecordXML);

router.get('/setup', EstimateCtrl.setUp);

module.exports = router;
