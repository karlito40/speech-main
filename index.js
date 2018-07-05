const io = require('socket.io')(3050);
const redis = require('socket.io-redis');

io.adapter(redis({ host: 'localhost', port: 6379 }));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
