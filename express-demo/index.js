const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const startupDebugger = require('debug')('app : startup');
const dbDebugger = require('debug')('app : db');

//app.set('view engine', 'pug');
//app.set('views','./views'); //default;

const app = express();
app.use(express.json());
app.use (logger);
app.use(helmet());

if(app.get('env') === 'development'){
    startupDebugger('Morgan enabled');
}

dbDebugger('Connecting to the database.');
app.use(morgan('tiny'));
const courses = [
    {id : 1, course : 1},
    {id : 2, course : 2},
    {id : 3, course : 3},
];

app.get('/', (req,res) => {
    res.send('Hello World!!!');
    //res.render('index', {title : 'my express app', message : 'Hello' });
})

app.get('/api/courses', (req,res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req,res) => {
   let course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course) res.status(400).send('Given id not found');
   res.send(course);
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    
    const course = {
        id : 4,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {

   let course = courses.find(c=> c.id === parseInt(req.params.id));

   if(!course) return res.status(400).send('Given id not found'); 
   res.send(course);

   const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {

    let course = courses.find(c=> c.id === parseInt(req.params.id));
 
    if(!course) return res.status(400).send('Given id not found');
    res.send(course);
 
    const index = courses.indexOf(course);
    courses.splice(index,1);

     res.send(course);
 })

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
    
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening port ${port}..`));