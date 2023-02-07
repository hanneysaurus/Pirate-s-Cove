const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

// whenever someone connects this is triggered
io.on('connection', (sock) =>{
   console.log("Someone just connected!")
   sock.emit('message', 'You have joined the game! There are ' + (io.engine.clientsCount - 1) + ' other players.');
   sock.on('message', (text) => io.emit('message', text));
});

server.on('error', (err) =>{
   console.error(err);
});

server.listen(8080, () =>{
   console.log('Server is ready');
});
