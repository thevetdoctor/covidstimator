// const express = require('express');
// const path = require('path');
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { toXml, toJson } = require('json-xml');
const fs = require('fs');
const Estimate = require('../models/index.js');
const covid19ImpactEstimator = require('../estimator.js');
const { setupDB } = require('../db/migration.js');

const start = new Date();

const getTime = (url, method, status = 200) => {
  const timeTaken = new Date() - start;
  console.log('Request took:', timeTaken, 'ms');
  const logMsg = `${method}\t\t${url}\t\t${status}\t\t${timeTaken} ms\n`;

  try {
    const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
  } catch (err) {
    console.log(err);
  }
};

const EstimateCtrl = {
  getAll: async (req, res) => {
    const { url, method } = req;
    console.log('Welcome to COVID Estimator API Endpint!');

    const result = await Estimate.list();
    getTime(url, method);

    res.json({
      status: 200,
      count: result.length,
      result,
      message: 'Welcome to COVID Estimator API Endpoint!'
    });
  },

  addRecord: async (req, res) => {
    const { url, method } = req;
    console.log(url, method);
    const {
      name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
    } = req.body.region;
    const {
      reportedCases, population, totalHospitalBeds, timeToElapse, periodType
    } = req.body;
    const newEstimate = new Estimate(name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, reportedCases, population, totalHospitalBeds, timeToElapse, periodType);
    const savedEstimate = await newEstimate.save();

    const output = covid19ImpactEstimator(req.body);
    getTime(url, method);

    return res.json({
      status: 200,
      output,
      message: 'Welcome to COVID Estimator API Endpoint!'
    });
  },

  addRecordXML: async (req, res) => {
    const { url, method, params } = req;
    const { tag } = req.params;
    console.log(url, method, params);
    const {
      name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
    } = req.body.region;
    const {
      reportedCases, population, totalHospitalBeds, timeToElapse, periodType
    } = req.body;
    const newEstimate = new Estimate(name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation, reportedCases, population, totalHospitalBeds, timeToElapse, periodType);
    const savedEstimate = await newEstimate.save();

    const output = covid19ImpactEstimator(req.body);
    const xmlOutput = toXml(output);

    // getTime(url, method);
    if (tag === 'xml') {
      getTime(url, method,);
      return res.format({
      'application/xml': () => res.send(xmlOutput)
    });
    } else if (tag === 'json') {
      getTime(url, method);
      return res.format({
        'application/json': () => res.send(output)
      });
    }
    getTime(url, method, 404);
    return res.send('Only json and xml response formats are allowed!');
  },

  getLogs: (req, res) => {
    let rooturl = __dirname.replace('\\src\\controllers', '');
    if (process.env.NODE_ENV === 'production') {rooturl = '/app'}
    const options = {
      root: rooturl,
      headers: {
        'Content-Type': 'text/plain'
      }
    };
    res.sendFile('logs.txt', options, (err) => {
      if (err) {
        console.log(options.root);
        console.log('File not available yet!');
        res.json({
          status: 404,
          message: 'File not available yet!'
        });
      } else {
        console.log(options.root);
        console.log('File rendered!');
      }
    });
  },

  setUp: (req, res) => {
    const { url, method } = req;
    setupDB().then((a) => console.log('Test DB setup'));

    getTime(url, method);

    res.json({
      status: 200,
      message: 'Database setup!'
    });
  },

  getHome: (req, res) => {
    const { url, method } = req;

    getTime(url, method);

    res.json({
      status: 200,
      message: 'Welcome to COVID Estimator App!'
    });
  }
};

module.exports = EstimateCtrl;
