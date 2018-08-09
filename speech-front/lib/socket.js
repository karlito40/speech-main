import io from 'socket.io-client';
import config from '../client.config.js';
import { withSocket as apiWithSocket } from '../store/api';

let socket = null;
export const init = (token) => {
  if(socket) {
    return;
  }

  console.log('Trying to connect to', config.WS_HOST);
  socket = io(config.WS_HOST + '?token=' + token, {
    transports: ['websocket']
  });

  socket.on('connect', function(){
    console.log('Connection succeeded on', config.WS_HOST);
  });

  apiWithSocket(socket);
}
