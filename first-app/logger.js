const EventEmitter = require('events');

var url = 'http://www.google.com';

 class Logger extends EventEmitter {
     log (message) {
        console.log(message);
        //Raise an event
        this.emit('messageLogged', {id: 1, url: "http://ex.com"});   
    }
 }


module.exports = Logger;