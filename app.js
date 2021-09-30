const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let countUserOnline = 1;

io.on('connection', (socket) => {
  socket.on('join', (param) => {
    console.log('joining the chat...');
    countUserOnline++;
    io.emit('countUserOnline', countUserOnline);
  });
  socket.on('message', (param) => {
    console.log('new message is appeared...');
    io.emit('message', param);
  });
  socket.on('disconnect', (param) => {
    console.log('leave the chat....');
    countUserOnline--;
    io.emit('countUserOnline', countUserOnline);
  });
});

httpServer.listen(3001);
