const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then( () => console.log('Connected to Mongodb.'))
.catch(err => console.error('Could not connected to mongodb',err));

const courseSchema = new mongoose.Schema(
    {
        name : {type : String, required : true, minlength:5,maxlength: 50}, // built in validation
        author : String,
        category : {type : String, required : true, enum : ['mobile', 'web', 'network'], 'lowercase' : true},
        tags : {type : Array, validate : { // custom validation
            validator : function(value){
                return value && value.length > 0;
            },
            message: 'A Course should have at least one tag.'
        }},
        date : {type : Date, default: Date.now},
        isPublished : Boolean,
        price : {type :Number , required : function(){ // price is required is isPublished is true;
            return this.isPublished;
        },   get : v => Math.round(v),
             set : v => Math.round(v)},
    }
);


async function createCourse(){
    const Course = mongoose.model('Course', courseSchema); 
    const course = new Course({
    name : 'Angular course',
    author : 'Sohel Rana',
    tags: ['node', 'frontend3'],
    isPublished : true,
    price : 15,
    category : 'Web'
});
    try{
        const result = await course.save();
        console.log(result);
    } catch(ex){
        //console.log(ex.message);
        for(field in ex.errors)
            console.log(ex.errors[field].message);
        
    }
   

}

//createCourse();

const Course = mongoose.model('Course', courseSchema); 

async function getCourses(){

    const courses = await Course
    .find({isPublished : true, tags : { $in : ['frontend', 'backend']}})
    //.sort({price : -1})
    .sort('-price')
   // .select({name : 1, author:1, price : 1});
   .select('name price author');
    console.log(courses);
}
//getCourses();

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

async function updateCourse(id){
    console.log('sssss');
    const course = await Course.findById(id);
    if(!course) return;
    course.name = 'Another name';
    course.price = 100;
    const result = await course.save();
    console.log(result);
}

async function deleteCourse(id){
    
    const result = await Course.deleteOne({_id:id});
    console.log(result);
}

//deleteCourse('5a68ff090c553064a218a547');
createCourse();