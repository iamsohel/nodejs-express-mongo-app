const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const startupDebugger = require('debug')('app : startup');
const dbDebugger = require('debug')('app : db');

const courses = require('./routes/courses');
const home = require('./routes/home');

//app.set('view engine', 'pug');
//app.set('views','./views'); //default;

const app = express();
app.use(express.json());
app.use (logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development'){
    startupDebugger('Morgan enabled');
}

dbDebugger('Connecting to the database.');
app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening port ${port}..`));