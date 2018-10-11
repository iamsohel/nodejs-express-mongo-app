const http = require('http');

const server = http.createServer( (req, res) => {
    if(req.url === '/'){
        res.write('Hello world');
        res.end();
    }
});


//server.on('connection', (socket) => {
 //   console.log('new connection..');
//});

server.listen(3000);
console.log('Listening port 3000');