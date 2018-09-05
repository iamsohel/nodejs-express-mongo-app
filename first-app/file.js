const fs = require('fs');

//const files = fs.readdirSync('./');

//console.log(files);

const files = fs.readdir('./', function(error, files){
    if(error) console.log('error', error);
    else console.log('files', files);
})