/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const server = require('../server.js');
const db = require('../db/index');
const { setupDB } = require('../db/migration');

const request = supertest(server);

beforeAll(async () => {
  await setupDB().then(() => console.log('Test DB setup'));
});

test('Testing API endpoint', async (done) => {
  console.log('Test1!');
  const res = await request.get('/api/v1/on-covid-19');
  console.log(res.body);
  expect(res.body).toBeTruthy();
  done();
});
test('Testing API endpoint for XML response type', async (done) => {
  console.log('Test2!');
  const res = await request.post('/api/v1/on-covid-19/xml').send({
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 3,
      avgDailyIncomePopulation: 0.68,
    },
    reportedCases: 1030,
    population: 6231388,
    totalHospitalBeds: 243398,
    timeToElapse: 2,
    periodType: 'months',
  });
  console.log(res.body);
  expect(res.body).toBeTruthy();
  done();
});
test('Testing API endpoint for json response type', async (done) => {
  console.log('Test3!');
  const res = await request.post('/api/v1/on-covid-19/json').send({
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 2,
      avgDailyIncomePopulation: 0.61,
    },
    reportedCases: 580,
    population: 9683987,
    totalHospitalBeds: 108936,
    timeToElapse: 12,
    periodType: 'weeks',
  });
  console.log(res.body);
  expect(res.body).toBeTruthy();
  done();
});
test('Testing logs endpoint', async (done) => {
  console.log('Test4!');
  const res = await request.get('/api/v1/on-covid-19/logs');
  console.log(res.type, res.text);
  expect(res.text).toBeTruthy();
  done();
});
test('Testing home endpoint', async (done) => {
  console.log('Test5!');
  const res = await request.get('/');
  console.log(res.body);
  expect(res.body).toBeTruthy();
  done();
});
test('Testing truthy/falsy', () => {
  console.log('Test6!');
  expect(2 + 2).toBeTruthy();
  expect(2 * 0).toBeFalsy();
});

afterAll(async () => {
  await db.end();
});
