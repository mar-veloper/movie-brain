const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser());
app.use(morgan('tiny'));

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = app;
