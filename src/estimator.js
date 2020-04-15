/* eslint-disable no-console */
/* eslint-disable max-len */

const covid19ImpactEstimator = (data) => {
// challenge 1
  const { reportedCases, periodType } = data;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  let requestedTime;
  if (periodType === 'days') {
    requestedTime = data.timeToElapse;
  } else if (periodType === 'weeks') {
    requestedTime = data.timeToElapse * 7;
  } else if (periodType === 'months') {
    requestedTime = data.timeToElapse * 30;
  }
  const factorRemainder = (requestedTime % 3);
  const factorInteger = ((requestedTime - factorRemainder) / 3);
  const infectionFactor = 2 ** factorInteger;

  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * infectionFactor;
  const infectionsByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * infectionFactor;

  // challenge 2
  // 15% of infectionsByRequestedTime for both impact & severeImpact
  const severeCasesByRequestedTimeFactor = 0.15;
  const severeCasesByRequestedTimeImpact = severeCasesByRequestedTimeFactor * infectionsByRequestedTimeImpact;
  const severeCasesByRequestedTimeSevereImpact = severeCasesByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact;

  const { totalHospitalBeds } = data;

  const bedAvailability = 0.35; // 35% of totalHospitalBeds
  const hospitalBedsByRequestedTime = bedAvailability * totalHospitalBeds;
  const hospitalBedsByRequestedTimeImpact = Math.trunc(hospitalBedsByRequestedTime - severeCasesByRequestedTimeImpact);
  const hospitalBedsByRequestedTimeSevereImpact = Math.trunc(hospitalBedsByRequestedTime - severeCasesByRequestedTimeSevereImpact);


  // challenge 3

  // 5% of infectionsByRequestedTime for both impact & severeImpact
  const casesForICUByRequestedTimeFactor = 0.05;

  // 2% of infectionsByRequestedTime for both impact & severeImpact
  const casesForVentilatorsByRequestedTimeFactor = 0.02;

  const casesForICUByRequestedTimeImpact = Math.trunc(casesForICUByRequestedTimeFactor * infectionsByRequestedTimeImpact);
  const casesForICUByRequestedTimeSevereImpact = Math.trunc(casesForICUByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact);

  const casesForVentilatorsByRequestedTimeImpact = Math.trunc(casesForVentilatorsByRequestedTimeFactor * infectionsByRequestedTimeImpact);
  const casesForVentilatorsByRequestedTimeSevereImpact = Math.trunc(casesForVentilatorsByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact);

  const { avgDailyIncomeInUSD } = data.region;
  const { avgDailyIncomePopulation } = data.region;

  const dollarsInFlightImpact = Math.trunc((infectionsByRequestedTimeImpact * avgDailyIncomePopulation * avgDailyIncomeInUSD) / requestedTime);
  const dollarsInFlightSevereImpact = Math.trunc((infectionsByRequestedTimeSevereImpact * avgDailyIncomePopulation * avgDailyIncomeInUSD) / requestedTime);

  const impact = {
    currentlyInfected: currentlyInfectedImpact,
    infectionsByRequestedTime: infectionsByRequestedTimeImpact,
    severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact,
    casesForICUByRequestedTime: casesForICUByRequestedTimeImpact,
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact,
    dollarsInFlight: dollarsInFlightImpact,
  };
  const severeImpact = {
    currentlyInfected: currentlyInfectedSevereImpact,
    infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact,
    severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact,
    casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact,
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereImpact,
    dollarsInFlight: dollarsInFlightSevereImpact,
  };

  const output = {
    data,
    impact,
    severeImpact,
  };

  return output;
};

module.exports = covid19ImpactEstimator;
