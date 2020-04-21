/* eslint-disable no-console */
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/route.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// app.use(express.static('public'));
// app.set('json spaces', 10);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err) { next(err); }
  res.status(500).send('Something broke!');
});

app.use('/', router);

module.exports = app;
