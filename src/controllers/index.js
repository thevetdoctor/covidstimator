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

const EstimateCtrl = {
  getAll: (req, res) => {
    const { url, method } = req;
    console.log(url, method);
    console.log('Welcome to COVID Estimator API Endpint!');
    console.log('user', process.env.USERNAME);
    console.log('NODE_ENV :', process.env.NODE_ENV);

    const result = Estimate.list();

    const timeTaken = new Date() - start;
    console.log('Request took:', timeTaken, 'ms');
    const logMsg = `${method}\t\t${url}\t\t200\t\t$${timeTaken} ms\n`;

    try {
      const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
    } catch (err) {
      console.log(err);
    }
    res.json({
      status: 200,
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
    const timeTaken = new Date() - start;
    console.log('Request took:', timeTaken, 'ms');
    const logMsg = `${method}\t\t${url}\t\t200\t\t${timeTaken} ms\n`;

    try {
      const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
    } catch (err) {
      console.log(err);
    }
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

    const timeTaken = new Date() - start;
    console.log('Request took:', timeTaken, 'ms');
    const logMsg = `${method}\t\t${url}\t\t200\t\t${timeTaken} ms\n`;

    try {
      const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
    } catch (err) {
      console.log(err);
    }

    res.format({
      'application/xml': () => res.send(xmlOutput)
    });
  },

  getLogs: (req, res) => {
    const options = {
      root: __dirname.replace('\\src\\controllers', ''),
      headers: {
        'Content-Type': 'text/plain'
      }
    };
    res.sendFile('logs.txt', options, (err) => {
      if (err) {
        // console.log(err);
        res.json({
          status: 404,
          message: 'File not available yet!'
        });
      } else {
        console.log('File rendered!');
      }
    });
  },

  setUp: (req, res) => {
    const { url, method } = req;
    console.log(url, method);
    setupDB().then((a) => console.log('Test DB setup'));

    const timeTaken = new Date() - start;
    console.log('Request took:', timeTaken, 'ms');
    const logMsg = `${method}\t\t${url}\t\t200\t\t${timeTaken} ms\n`;

    try {
      const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
    } catch (err) {
      console.log(err);
    }
    res.json({
      status: 200,
      message: 'Database setup!'
    });
  },

  getHome: (req, res) => {
    const { url, method } = req;
    console.log(url, method);
    console.log('Welcome to COVID Estimator App!');

    const timeTaken = new Date() - start;
    console.log('Request took:', timeTaken, 'ms');
    const logMsg = `${method}\t\t${url}\t\t200\t\t${timeTaken} ms\n`;

    try {
      const data = fs.writeFile('./logs.txt', logMsg, { flag: 'a+' }, (err) => {});
    } catch (err) {
      console.log(err);
    }
    res.json({
      status: 200,
      message: 'Welcome to COVID Estimator App!'
    });
  }
};

module.exports = EstimateCtrl;
