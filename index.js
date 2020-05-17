require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const baseRoute = require('./app/base/base.route');
const { environment, database } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('default'));
app.use(helmet());

app.use((req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).end();
    }else {
        next();
    }
});

if (process.env.NODE_ENV === "production") {
    app.set('trust proxy', 1);
    const limiter = rateLimit({
        headers: false,
        windowMs: 60 * 1000, // 1 minute
        max: 10, // 10 requests,
        message: "Too many accounts created from this IP, please try again after in minute"
    });
    app.use(limiter);
}

app.use('/', baseRoute);

// connect to DB
database.connect(environment.dbUrl);

// start server on defined port based on environment
app.listen(environment.port);

console.log(`Yo! we are live at ${environment.port}`);