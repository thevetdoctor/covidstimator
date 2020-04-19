/* eslint-disable no-console */
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const router = require('./routes/route.js');

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});


module.exports = app;
