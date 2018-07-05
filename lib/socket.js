import io from 'socket.io-client';
import config from '../client.config.js';

let socket = null;
export const init = () => {
  if(socket) {
    return;
  }

  console.log('Trying to connect to', config.WS_HOST);
  socket = io(config.WS_HOST, {
    transports: ['websocket']
  });

  socket.on('connect', function(){
    console.log('Connection succeeded on', config.WS_HOST);
  });

  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}
