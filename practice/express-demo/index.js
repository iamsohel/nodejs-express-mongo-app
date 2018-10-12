const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const courses = [
    {id : 1, name: "Courser1"},
    {id : 2, name: "Courser2"},
    {id : 3, name: "Courser3"}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Resource not found.");
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Resource not found.");

    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Resource not found.");

    courses.pop(course);
    res.send(courses);
});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port =  process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}..`));