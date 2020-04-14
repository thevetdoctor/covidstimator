const { Pool, Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let db;

const dbUrl = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  };

if (process.env.NODE_ENV === '') {
  db = new Client(dbUrl);

} else {
  db = new Client(dbUrl);

}

db.connect((err, res) => {
  if (err) {
    // console.log(err);
    console.log(`Some error in connection to: ${process.env.DB_NAME} DB`);
    return;
  }
  console.log('Connected to', res.database);
}); 
 
module.exports = db;