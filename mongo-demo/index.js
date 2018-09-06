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
getCourses();

// for data importing

/*[
    {"_id":"5a68fdc3615eda645bc6bdec","tags":["express","backend"],"date":"2018-01-24T21:42:27.388Z","name":"Express.js Course","author":"Mosh","isPublished":true,"price":10,"__v":0},
    {"_id":"5a68fdd7bee8ea64649c2777","tags":["node","backend"],"date":"2018-01-24T21:42:47.912Z","name":"Node.js Course","author":"Mosh","isPublished":true,"price":20,"__v":0},
    {"_id":"5a68fde3f09ad7646ddec17e","tags":["aspnet","backend"],"date":"2018-01-24T21:42:59.605Z","name":"ASP.NET MVC Course","author":"Mosh","isPublished":true,"price":15,"__v":0},
    {"_id":"5a68fdf95db93f6477053ddd","tags":["react","frontend"],"date":"2018-01-24T21:43:21.589Z","name":"React Course","author":"Mosh","isPublished":false,"__v":0},
    {"_id":"5a68fe2142ae6a6482c4c9cb","tags":["node","backend"],"date":"2018-01-24T21:44:01.075Z","name":"Node.js Course by Jack","author":"Jack","isPublished":true,"price":12,"__v":0},
    {"_id":"5a68ff090c553064a218a547","tags":["node","backend"],"date":"2018-01-24T21:47:53.128Z","name":"Node.js Course by Mary","author":"Mary","isPublished":false,"price":12,"__v":0},
    {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
  ]*/

// import command 
// mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray
// same folder theke command likhte hobe