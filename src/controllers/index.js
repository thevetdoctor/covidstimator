// const express = require('express');
// const path = require('path');
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { toXml, toJson } = require('json-xml');
const fs = require('fs');
const path = require('path');
const Estimate = require('../models/index.js');
const covid19ImpactEstimator = require('../estimator.js');
const { setupDB } = require('../db/migration.js');

const start = Date.now();

const getTime = (method, url, status = 200) => {
  console.log(method, url, url.length);
  const timeTaken = (Date.now() - start);
  console.log('Request took:', timeTaken, 'seconds');
  const logMsg = url.length <= 23 ? `${Date.now()}\t\t${method}\t\t${url}\t\t${status}\t\tdone in ${timeTaken} seconds\n` : `${Date.now()}\t\t${method}\t\t${url}\t${status}\t\tdone in ${timeTaken} seconds\n`;

  try {
    const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
  } catch (err) {
    console.log(err);
  }
};

const EstimateCtrl = {
  getAll: async (req, res) => {
    const { method, url } = req;
    const result = await Estimate.list();
    // console.log(result);
    console.log(req.comment);
    getTime(method, url);

    res.status(200).json({
      count: result.length,
      result,
    });
  },

  addRecord: async (req, res) => {
    const { method, url } = req;
    console.log(method, url);
    const {
      name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation,
    } = req.body.region;
    const {
      reportedCases, population, totalHospitalBeds, timeToElapse, periodType,
    } = req.body;
    const newEstimate = new Estimate(name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, reportedCases, population, totalHospitalBeds, timeToElapse, periodType);
    const savedEstimate = await newEstimate.save();

    const output = covid19ImpactEstimator(req.body);
    getTime(method, url);

    return res.status(200).json({
      output,
    });
  },

  addRecordXML: async (req, res) => {
    const { method, url, params } = req;
    const { tag } = req.params;
    console.log(method, url, params);
    const {
      name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation,
    } = req.body.region;
    const {
      reportedCases, population, totalHospitalBeds, timeToElapse, periodType,
    } = req.body;
    const newEstimate = new Estimate(name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, reportedCases, population, totalHospitalBeds, timeToElapse, periodType);
    const savedEstimate = await newEstimate.save();

    const output = covid19ImpactEstimator(req.body);
    const xmlOutput = toXml(output);

    if (tag === 'xml') {
      getTime(method, url);
      return res.format({
        'application/xml': () => res.send(xmlOutput),
      });
    }
    if (tag === 'json') {
      getTime(method, url);
      return res.format({
        'application/json': () => res.send(output),
      });
    }
    getTime(method, url, 404);
    return res.send('Only json and xml response formats are allowed!');
  },

  getLogs: (req, res) => {
    const { method, url } = req;
    console.log(method, url);
    let rootUrl = __dirname.replace('\\src\\controllers', '');
    if (process.env.NODE_ENV === 'production') {
      rootUrl = '/app';
    }
    const options = {
      root: rootUrl,
      headers: {
        'Content-Type': 'text/plain',
      },
    };
    res.sendFile('logs.txt', options, (err) => {
      if (err) {
        console.log(options.root);
        console.log('File not available yet!');
        res.json({
          status: 404,
          message: 'File not available yet!',
        });
      } else {
        console.log(options.root);
        console.log('File rendered!');
        res.end();
      }
    });
  },

  setUp: (req, res) => {
    const { method, url } = req;
    setupDB().then((a) => console.log('Test DB setup'));

    getTime(method, url);

    res.status(200).json({
      message: 'Database setup!',
    });
  },

  getHome: (req, res) => {
    const { method, url } = req;

    getTime(method, url);

    res.status(200).json({
      message: 'Welcome to COVID Estimator App!',
    });
    // res.status(200).sendFile(path.join(__dirname, '../../index.html'));
  },
};

module.exports = EstimateCtrl;
