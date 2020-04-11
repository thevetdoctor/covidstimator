/* eslint-disable no-console */
/* eslint-disable max-len */
console.log('COVID-19 Estimator App');

const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

// const outputData = {
//   data: {}, // the input data you got
//   impact: {}, // your best case estimation
//   severeImpact: {} // your severe case estimation
// };

function Estimator(data) {
  // challenge 1
  const reportedCases = data.reportedCases;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  console.log('reportedCases: ', reportedCases);
  console.log('currentlyInfectedImpact; ', currentlyInfectedImpact);
  console.log('currentlyInfectedSevereImpact: ', currentlyInfectedSevereImpact);

  const requestedTime = data.timeToElapse;
  const factorRemainder = (requestedTime % 3);
  const factorInteger = ((requestedTime - factorRemainder) / 3);
  const infectionFactor = 2 ** factorInteger;

  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * infectionFactor;
  const infectionsByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * infectionFactor;
  console.log('requestedTime: ', requestedTime);
  console.log('factorRemainder: ', factorRemainder);
  console.log('factorInteger: ', factorInteger);
  console.log('infectionFactor: ', infectionFactor);
  console.log('infectionsByRequestedTimeImpact; ', infectionsByRequestedTimeImpact);
  console.log('infectionsByRequestedTimeSevereImpact: ', infectionsByRequestedTimeSevereImpact);


  // challenge 2
  // 15% of infectionsByRequestedTime for both impact & severeImpact
  const severeCasesByRequestedTimeFactor = 0.15;
  const severeCasesByRequestedTimeImpact = severeCasesByRequestedTimeFactor * infectionsByRequestedTimeImpact;
  const severeCasesByRequestedTimeSevereImpact = severeCasesByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact;

  const totalHospitalBeds = data.totalHospitalBeds;

  console.log('severeCasesByRequestedTimeFactor: ', `${severeCasesByRequestedTimeFactor * 100}%`);
  console.log('severeCasesByRequestedTimeImpact: ', severeCasesByRequestedTimeImpact);
  console.log('severeCasesByRequestedTimeSevereImpact: ', severeCasesByRequestedTimeSevereImpact);
  console.log('totalHospitalBeds: ', totalHospitalBeds);

  const bedAvailability = 0.35; // 35% of totalHospitalBeds
  const hospitalBedsByRequestedTime = Math.floor(bedAvailability * totalHospitalBeds);
  const hospitalBedsByRequestedTimeImpact = hospitalBedsByRequestedTime - severeCasesByRequestedTimeImpact;
  const hospitalBedsByRequestedTimeSevereImpact = hospitalBedsByRequestedTime - severeCasesByRequestedTimeSevereImpact;

  console.log('hospitalBedsByRequestedTime: ', hospitalBedsByRequestedTime);
  console.log('hospitalBedsByRequestedTimeImpact: ', hospitalBedsByRequestedTimeImpact);
  console.log('hospitalBedsByRequestedTimeSevereImpact: ', hospitalBedsByRequestedTimeSevereImpact);


  // challenge 3
  // 5% of infectionsByRequestedTime for both impact & severeImpact
  const casesForICUByRequestedTimeFactor = 0.05;

  // 2% of infectionsByRequestedTime for both impact & severeImpact
  const casesForVentilatorsByRequestedTimeFactor = 0.02;

  const casesForICUByRequestedTimeImpact = Math.floor(casesForICUByRequestedTimeFactor * infectionsByRequestedTimeImpact);
  const casesForICUByRequestedTimeSevereImpact = Math.floor(casesForICUByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact);

  const casesForVentilatorsByRequestedTimeImpact = Math.floor(casesForVentilatorsByRequestedTimeFactor * infectionsByRequestedTimeImpact);
  const casesForVentilatorsByRequestedTimeSevereImpact = Math.floor(casesForVentilatorsByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact);

  console.log('casesForICUByRequestedTimeFactor: ', `${casesForICUByRequestedTimeFactor * 100}%`);
  console.log('casesForICUByRequestedTimeImpact: ', casesForICUByRequestedTimeImpact);
  console.log('casesForICUByRequestedTimeSevereImpact', casesForICUByRequestedTimeSevereImpact);

  console.log('casesForVentilatorsByRequestedTimeFactor: ', `${casesForVentilatorsByRequestedTimeFactor * 100}%`);
  console.log('casesForVentilatorsByRequestedTimeImpact: ', casesForVentilatorsByRequestedTimeImpact);
  console.log('casesForVentilatorsByRequestedTimeSevereImpact: ', casesForVentilatorsByRequestedTimeSevereImpact);

  const { avgDailyIncomeInUSD } = data.region;
  const { avgDailyIncomePopulation } = data.region;

  const dollarsInFlightImpact = Math.floor((infectionsByRequestedTimeImpact * avgDailyIncomePopulation * avgDailyIncomeInUSD) / requestedTime);
  const dollarsInFlightSevereImpact = Math.floor((infectionsByRequestedTimeSevereImpact * avgDailyIncomePopulation * avgDailyIncomeInUSD) / requestedTime);

  console.log('avgDailyIncomeInUSD: ', `$${avgDailyIncomeInUSD}`);
  console.log('avgDailyIncomePopulation: ', `${avgDailyIncomePopulation * 100}%`);
  console.log('dollarsInFlightImpact: ', `$${dollarsInFlightImpact}`);
  console.log('dollarsInFlightSevereImpact: ', `$${dollarsInFlightSevereImpact}`);

  const estimate = {
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact,
      dollarsInFlight: dollarsInFlightImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereImpact,
      dollarsInFlight: dollarsInFlightSevereImpact
    }
  };

  const output = {
    data,
    estimate
  };

  console.log('output: ', output);
  return output;
}

Estimator(inputData);
