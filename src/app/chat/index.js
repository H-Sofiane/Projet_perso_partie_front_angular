/*let express = require('express')
let app = express();
let app = require('express')();*/
let app = require('express');

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const documents = {};

const port = process.env.PORT || 3000;

/*io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
     console.log(message);
     io.emit(message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});*/

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('send-message', (data) => {
		console.log(data.text);
		io.emit('message-received', data);
	});
});

server.listen(port,()=> {
		console.log(`started on port: ${port}`);
	});