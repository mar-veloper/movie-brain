const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

app.use(bodyParser());
app.use(morgan('tiny'));

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use('/api/movies', routes.movies);

module.exports = app;
