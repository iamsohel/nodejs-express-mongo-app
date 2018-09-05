const express = require('express');

const router = express.Router();

const courses = [
    {id : 1, course : 1},
    {id : 2, course : 2},
    {id : 3, course : 3},
];

router.get('/', (req,res) => {
    res.send(courses);
})

router.get('/:id', (req,res) => {
   let course = courses.find(c=> c.id === parseInt(req.params.id));
   if(!course) res.status(400).send('Given id not found');
   res.send(course);
})

router.post('/', (req, res) => {

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    
    const course = {
        id : 4,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);
})

router.put('/:id', (req, res) => {

   let course = courses.find(c=> c.id === parseInt(req.params.id));

   if(!course) return res.status(400).send('Given id not found'); 
   res.send(course);

   const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', (req, res) => {

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

module.exports = router;