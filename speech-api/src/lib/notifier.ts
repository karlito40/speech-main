import emitter from "socket.io-emitter";
import { log } from "./logger";

const notifier = { io: null };

export const init = () => {
  notifier.io = emitter(({ host: process.env.SOCKET_HOST_ADAPTER, port: process.env.SOCKET_PORT_ADAPTER }));
};

export const user = (mixed, ...args) => {
  const userId = (typeof mixed == "number") ? mixed : mixed.id;
  const room = `user-${userId}`;

  log("debug", `notify ${room} with`, args);

  const socket = notifier.io.to(room);
  socket.emit.apply(socket, args);
};

export default notifier;

