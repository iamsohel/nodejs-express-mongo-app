const EventEmitter = require('events');

var url = 'http://sohel.com/';

class Logger extends EventEmitter {
     log(message){
        console.log('Message', message);
        this.emit('messageLogged',{id:3, url : 'http://s.com'});
    }
}


module.exports = Logger;
