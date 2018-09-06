const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then( () => console.log('Connected to Mongodb.'))
.catch(err => console.error('Could not connected to mongodb',err));

const CourseSchema = new mongoose.Schema(
    {
        name : String,
        author : String,
        tags : [String],
        date : {type : Date, default: Date.now},
        isPublished : Boolean
    }
);


async function createCourse(){
    const Course = mongoose.model('Course', CourseSchema); 
    const course = new Course({
    name : 'Angular course',
    author : 'Sohel Rana',
    tags: ['node', 'frontend3'],
    isPublished : true
});

const result = await course.save();
console.log(result);

}

createCourse();

const Course = mongoose.model('Course', CourseSchema); 

async function getCourses(){
    // eq
    // neq
    //gt(greater than)
    //const courses = await Course.find();
    //.find({price : 10});
    //.find({price : {$th:10, $lt:20}})// course between 10 and 20 dollar
    //.find({price : {$in : [10, 15, 20]}}); // find course 10, or 15 or 20
    const courses = await Course.find();
    console.log(courses);
}
getCourses();