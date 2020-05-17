require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const cache = require('apicache').middleware;
const baseRoute = require('./app/base/base.route');
const { environment, database } = require('./config');

const app = express();

// rate limit requests in production to 10/min
if (process.env.NODE_ENV === "production") {
    // Since data doesn't change frequently we can cache it this long
    app.use(cache('6 hours'));

    app.set('trust proxy', 1);
    const limiter = rateLimit({
        headers: false,
        windowMs: 60 * 1000, // 1 minute
        max: 10, // 10 requests,
        message: "Too many accounts created from this IP, please try again after in minute"
    });
    app.use(limiter);
}

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

app.use('/', baseRoute);

// connect to DB
database.connect(environment.dbUrl);

// start server on defined port based on environment
app.listen(environment.port);

console.log(`Yo! we are live at ${environment.port}`);
