/* eslint-disable no-console */
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let db;

const dbUrl = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
};

if (process.env.USERNAME === ' ACER') {
  db = new Client(dbUrl);
} else {
  db = new Client({
    connectionString: process.env.HEROKU_DB_URI,
    ssl: true,
  });
}
 
db.connect((err, res) => {
  if (err) {
    console.log(err);
    console.log(`Some error in connection to: ${process.env.DB_NAME} DB`);
    return;
  }
  console.log('Connected to', res.database);
});

module.exports = db;
