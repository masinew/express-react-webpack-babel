import Socket from 'socket.io';
import request from 'request';

export default class Sockets {
  constructor(httpServer) {
    this.io = new Socket(httpServer);
    this.io.on('connection', (socket) => {
      this.socket = socket;
      socket.on('user connected', (userFullName) => {
        socket.join('user');
        socket.broadcast.to('user').emit('user connected', `${userFullName} Connected`);
      });

      socket.on('user disconnect', (userFullName) => {
        socket.leave('user');
        socket.broadcast.to('user').emit('user disconnect', `${userFullName} Disonnected`);
      });

      socket.on('disconnect', () => {
        // console.log(tmpUserFullName);
        // socket.broadcast.emit('user disconnect', `${tmpUserFullName} Disonnected`);
      });
    });

    this.getSocket = this.getSocket.bind(this);
    this.getIO = this.getIO.bind(this);
  }

  getSocket() {
    return this.socket;
  }

  getIO() {
    return this.io;
  }
}
