const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then( () => console.log('Connected to Mongodb.'))
.catch(err => console.error('Could not connected to mongodb',err));

const courseSchema = new mongoose.Schema(
    {
        name : String,
        author : String,
        tags : [String],
        date : {type : Date, default: Date.now},
        isPublished : Boolean
    }
);


async function createCourse(){
    const Course = mongoose.model('Course', courseSchema); 
    const course = new Course({
    name : 'Angular course',
    author : 'Sohel Rana',
    tags: ['node', 'frontend3'],
    isPublished : true
});

const result = await course.save();
console.log(result);

}

//createCourse();

const Course = mongoose.model('Course', courseSchema); 

async function getCourses(){

    const courses = await Course
    .find({isPublished : true, tags : 'backend'})
    .sort({name : 1})
    .select({name : 1, author:1});
    console.log(courses);
}
getCourses();