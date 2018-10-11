//const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger();

//console.log(logger);

logger.on('messageLogged', (arg) => {
    console.log('EventListener: ', arg);
});

logger.log('m');