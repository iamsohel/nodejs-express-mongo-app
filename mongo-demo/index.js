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

//createCourse();

const Course = mongoose.model('Course', CourseSchema); 

async function getCourses(){

    const pageNumber = 2;
    const pageSize = 10;
    //api/courses?pageNumber=2&pageSIze=10


    // comparison operator

    // eq
    // neq
    //gt(greater than)
    //const courses = await Course.find();
    //.find({price : 10});
    //.limit(10)
    //.sort({name : 1}) // 1 asc // -1 desc
    //select({name:1, tags:1})
     //.count();
    //.find({price : {$th:10, $lt:20}})// course between 10 and 20 dollar
    //.find({price : {$in : [10, 15, 20]}}); // find course 10, or 15 or 20
    const courses = await Course
    .find();
    //.skip((pageNumber-1)*pageSize)
    //limit(pageSize)
    console.log(courses);



    // logical operator

    // .find()
    // .or([{name :'sohel'},{tags : "asdf"}])




    // regurlar expression

    // starts with sohel
    //.find({author : /pattern/ - /^sohel/});

    //end with sohel
    //.find({author : /pattern/ - /sohel$/i}); i meand case insensative

    //contains sohel
    //.find({author : /.*sohel.*/i})



}
//getCourses();

