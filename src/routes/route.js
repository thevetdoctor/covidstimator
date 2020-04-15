const express = require('express');

const router = express.Router();
const EstimateCtrl = require('../controllers');

router.get('/', EstimateCtrl.getHome);

router.get('/api/v1/on-covid-19/logs', EstimateCtrl.getLogs);

router.get('/setup', EstimateCtrl.setUp);

router.get('/api/v1/on-covid-19', EstimateCtrl.getAll);

router.post('/api/v1/on-covid-19/', EstimateCtrl.addRecord);

router.post('/api/v1/on-covid-19/:tag', EstimateCtrl.addRecordXML);

module.exports = router;
