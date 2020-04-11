console.log('COVID-19 Estimator App');

const inputData = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
   };

const outputData = {
    data: {}, // the input data you got
    impact: {}, // your best case estimation
    severeImpact: {} // your severe case estimation
   };


let reportedCases, currentlyInfected, infectionsByRequestedTime, severeCasesByRequestedTime, totalHospitalBeds;

function Estimator(data) {

    //challenge 1
    reportedCases = data['reportedCases'];
    currentlyInfectedImpact = reportedCases * 10;
    currentlyInfectedSevereImpact = reportedCases * 50;
    console.log('reportedCases: ', reportedCases);
    console.log('currentlyInfectedImpact; ', currentlyInfectedImpact);
    console.log('currentlyInfectedSevereImpact: ', currentlyInfectedSevereImpact);

    let requestedTime = data['timeToElapse'];
    let factorRemainder = (requestedTime % 3);
    let factorInteger = ((requestedTime - factorRemainder) / 3);
    let infectionFactor = 2 ** factorInteger;

    infectionsByRequestedTimeImpact = currentlyInfectedImpact * infectionFactor;
    infectionsByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * infectionFactor;
    console.log('requestedTime: ', requestedTime);
    console.log('factorRemainder: ', factorRemainder);
    console.log('factorInteger: ', factorInteger);
    console.log('infectionFactor: ', infectionFactor);
    console.log('infectionsByRequestedTimeImpact; ', infectionsByRequestedTimeImpact);
    console.log('infectionsByRequestedTimeSevereImpact: ', infectionsByRequestedTimeSevereImpact);


    //challenge 2
severeCasesByRequestedTimeFactor = 0.15; // 15% of infectionsByRequestedTime for both impact & severeImpact
severeCasesByRequestedTimeImpact = severeCasesByRequestedTimeFactor * infectionsByRequestedTimeImpact;
severeCasesByRequestedTimeSevereImpact = severeCasesByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact;

totalHospitalBeds = data['totalHospitalBeds'];

console.log('severeCasesByRequestedTimeFactor: ', `${severeCasesByRequestedTimeFactor * 100}%`);
console.log('severeCasesByRequestedTimeImpact: ', severeCasesByRequestedTimeImpact);
console.log('severeCasesByRequestedTimeSevereImpact: ', severeCasesByRequestedTimeSevereImpact);
console.log('totalHospitalBeds: ', totalHospitalBeds);

let bedAvailability =  0.35; // 35% of totalHospitalBeds
let hospitalBedsByRequestedTime = Math.floor(bedAvailability * totalHospitalBeds);
let hospitalBedsByRequestedTimeImpact = hospitalBedsByRequestedTime - severeCasesByRequestedTimeImpact;
let hospitalBedsByRequestedTimeSevereImpact = hospitalBedsByRequestedTime - severeCasesByRequestedTimeSevereImpact;

console.log('hospitalBedsByRequestedTime: ', hospitalBedsByRequestedTime);
console.log('hospitalBedsByRequestedTimeImpact: ', hospitalBedsByRequestedTimeImpact);
console.log('hospitalBedsByRequestedTimeSevereImpact: ', hospitalBedsByRequestedTimeSevereImpact);


// challenge 3
casesForICUByRequestedTimeFactor = 0.05; // 5% of infectionsByRequestedTime for both impact & severeImpact
casesForVentilatorsByRequestedTimeFactor = 0.02; // 2% of infectionsByRequestedTime for both impact & severeImpact

casesForICUByRequestedTimeImpact = Math.floor(casesForICUByRequestedTimeFactor * infectionsByRequestedTimeImpact);
casesForICUByRequestedTimeSevereImpact = Math.floor(casesForICUByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact);

casesForVentilatorsByRequestedTimeImpact = Math.floor(casesForVentilatorsByRequestedTimeFactor * infectionsByRequestedTimeImpact);
casesForVentilatorsByRequestedTimeSevereImpact = Math.floor(casesForVentilatorsByRequestedTimeFactor * infectionsByRequestedTimeSevereImpact);

console.log('casesForICUByRequestedTimeFactor: ', `${casesForICUByRequestedTimeFactor * 100}%`);
console.log('casesForICUByRequestedTimeImpact: ', casesForICUByRequestedTimeImpact);
console.log('casesForICUByRequestedTimeSevereImpact', casesForICUByRequestedTimeSevereImpact);

console.log('casesForVentilatorsByRequestedTimeFactor: ', `${casesForVentilatorsByRequestedTimeFactor * 100}%`);
console.log('casesForVentilatorsByRequestedTimeImpact: ', casesForVentilatorsByRequestedTimeImpact);
console.log('casesForVentilatorsByRequestedTimeSevereImpact: ', casesForVentilatorsByRequestedTimeSevereImpact);

let avgDailyIncomeInUSD = data.region['avgDailyIncomeInUSD'];
let avgDailyIncomePopulation = data.region['avgDailyIncomePopulation'];

let dollarsInFlightImpact = Math.floor((infectionsByRequestedTimeImpact * avgDailyIncomePopulation * avgDailyIncomeInUSD) / requestedTime);
let dollarsInFlightSevereImpact = Math.floor((infectionsByRequestedTimeSevereImpact * avgDailyIncomePopulation * avgDailyIncomeInUSD) / requestedTime);

console.log('avgDailyIncomeInUSD: ', `$${avgDailyIncomeInUSD}`);
console.log('avgDailyIncomePopulation: ', `${avgDailyIncomePopulation * 100}%`);
console.log('dollarsInFlightImpact: ', `$${dollarsInFlightImpact}`);
console.log('dollarsInFlightSevereImpact: ', `$${dollarsInFlightSevereImpact}`);

let estimate = {
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

let output = {
                data,
                estimate  
            };

            console.log('output: ', output);
return output;
}

Estimator(inputData);