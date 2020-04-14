const db = require('./index.js'); 

const estimateTable = `create table if not exists
                                estimates (id serial primary key,
                                        region text not null,
                                        age numeric not null,
                                        avincome int not null,
                                        avincomepop numeric not null,
                                        reportedcases int not null,
                                        population int not null,
                                        totalbeds int not null,
                                        elapsetime int not null,
                                        periodtype text not null default 'days',
                                        createdon timestamp with time zone default now());`;


const tables = `${estimateTable}`;

const createTables = async () => {
  const res = await db.query(tables)
    .then((result) => {
      console.log('Tables created');
    })
    .catch((err) => console.log(err));

  return res;
};

const dropQuery = 'DROP TABLE IF EXISTS estimates';

const dropTables = async () => {
  const res = await db.query(dropQuery)
    .then((result) => {
      console.log('Tables dropped')
    })
    .catch((err) => console.log(err));
  return res;
};

// const dropDBQuery = 'DROP DATABASE covid'; 
// const createDBQuery = 'CREATE DATABASE IF NOT EXISTS covid';
// const createUserQuery = 'CREATE USER testuser WITH PASSWORD \'testpass\'';

const setupDB = async () => {
  try {
    // const dropDBResponse = await db.query(dropDBQuery);
    // const createDBResponse = await db.query(createDBQuery);
    const drop = await dropTables();
    const create = await createTables();
  } catch (err) {
    console.log('Error found', err);
  }
  return 'Done!';
};

module.exports = { dropTables, createTables, setupDB };
