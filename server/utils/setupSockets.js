import {Server} from 'socket.io';

const setupSockets = (server) => {
  const soc = new Server(server, {
    cors: {origin:"*", methods: ["GET", "POST"]},
  });

  soc.on("connect", (socket) => {
    console.log("Connected to sockets")
  })
  return soc;
}

export default setupSockets;



