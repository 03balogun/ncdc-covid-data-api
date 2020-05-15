/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 3/18/19
 * Time: 6:38 PM
 */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const baseRoute = require('./app/base/base.route');
const { environment, database } = require('./config');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/', baseRoute);

// connect to DB
database.connect(environment.dbUrl);
// start server on defined port based on environment
app.listen(environment.port);

console.log(`Yo! we are live at ${environment.port}`);
