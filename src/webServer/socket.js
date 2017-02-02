import Socket from 'socket.io';

export default class Sockets {
  constructor(httpServer) {
    const io = new Socket(httpServer);
    let tmpUserFullName;
    io.on('connection', (socket) => {
      socket.on('user connected', (userFullName) => {
        tmpUserFullName = userFullName;
        socket.broadcast.emit('user connected', `${userFullName} Connected`);
      });

      socket.on('user disconnect', (userFullName) => {
        socket.broadcast.emit('user disconnect', `${userFullName} Disonnected`);
      });

      socket.on('disconnect', () => {
        // console.log(tmpUserFullName);
        // socket.broadcast.emit('user disconnect', `${tmpUserFullName} Disonnected`);
      });
    });
  }
}
