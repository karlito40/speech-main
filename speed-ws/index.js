const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const api = require('./api');
const io = require('socket.io')(process.env.PORT || 3050);
const redis = require('socket.io-redis');

io.adapter(redis({ host: process.env.REDIS_HOST, port: process.env.PORT }));

io.use(async (socket, next) => {
  let token = socket.handshake.query.token;
  try {
    const response = await api.get('/me', { _token: token });
    socket.user = response.data;

    return next();
  } catch (e) {
    return next(new Error('authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.user.id} connected`);
  socket.join(`user-${socket.user.id}`);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect', async (reason) => {
    console.log(`User ${socket.user.id} disconnected`);
  });
});
