 
//const path = require('path');

//var pathObj = path.parse(__filename);
//console.log(pathObj);

const os = require('os');
var freeMemory = os.freemem();
var totalMemory = os.totalmem();

console.log(`Total Memory : ${totalMemory} and Free Memory : ${freeMemory}`);