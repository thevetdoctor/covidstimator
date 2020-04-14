/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const express = require('express');
const {toXml, toJson} = require('json-xml');
const router = express.Router();
const { setupDB } = require('../db/migration.js');
const data = require('../testing.js');
const covid19ImpactEstimator = require('../estimator.js');
const Estimate = require('../models/index.js');


router.get('/', (req, res) => {
  console.log('Welcome to COVID Estimator App!');
  res.json({
    status: 200,
    message: 'Welcome to COVID Estimator App!'
  });
});

router.get('/setup', (req, res) => {
  setupDB().then((a) => console.log('Test DB setup'));
  res.json({
    status: 200,
    message: 'Database setup!'
  });
});

router.get('/api/v1/on-COVID-19', async (req, res) => {
  console.log('Welcome to COVID Estimator API Endpint!');
  console.log('user', process.env.USERNAME);
  // const result = data.map(x => covid19ImpactEstimator(x));


  const result = await Estimate.list();
  // console.log(result);
  res.json({
    status: 200,
    result,
    message: 'Welcome to COVID Estimator API Endpoint!'
  });
});

router.post('/api/v1/on-COVID-19/:tag', async (req, res) => {
    const { url, method, params } = req;
    const { tag } = req.params;
    console.log(url, method, params);
    const { name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation } = req.body['region'];
    const { reportedCases, population, totalHospitalBeds, timeToElapse, periodType } = req.body;
    const newEstimate = new Estimate(name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, reportedCases, population, totalHospitalBeds, timeToElapse, periodType);
    const savedEstimate = await newEstimate.save();
    
    const output = covid19ImpactEstimator(req.body);
    const xml = toXml(output);
    // console.log(output, xml);
    
    if (tag === 'xml') {
        return { xml };
    }
  return res.json({
    status: 200,
    output,
    message: 'Welcome to COVID Estimator API Endpoint!'
  });
});

module.exports = router;
