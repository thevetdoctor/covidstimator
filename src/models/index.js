const db  = require('../db/index.js');

class Estimate {
    constructor(region, age, avincome, avincomepop,
      reportedcases, population, totalbeds, elapsetime, periodtype = 'days') {
      this.region = region;
      this.age = age;
      this.avincome = avincome;
      this.avincomepop = avincomepop;
      this.reportedcases = reportedcases;
      this.population = population;
      this.totalbeds = totalbeds;
      this.elapsetime = elapsetime;
      this.periodtype = periodtype;
    }

    async save() {
      const objKeys = Object.keys(this);
      const objValues = Object.values(this);
      let valuesCount = [];
      for (let i = 1; i <= objKeys.length; i++) {
        valuesCount.push(`$${i}`);
      }
      
      const queryStr = `INSERT INTO estimates (${objKeys}) values(${valuesCount}) RETURNING *`;
    if (objValues === undefined) {
      console.log('Values not supplied');
      return;
    }
    // console.log(queryStr);

      const res = await db.query(queryStr, objValues)
        .then(result => result.rows)
        .catch(err => {
          console.log(err);
          return 'Error found here!', err.message;
      });
      return res;
    }

    static async list() {
      const queryStr = `SELECT * FROM estimates ORDER BY id DESC`;

      const res = await db.query(queryStr)
        .then(result => result.rows)
        .catch(err => {
          console.log(err);
          return 'Error found here!', err.message;
        });
        return res;
    }
  }
  

  module.exports = Estimate;