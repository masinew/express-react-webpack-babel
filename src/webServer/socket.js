import Socket from 'socket.io';
import request from 'request';

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

      socket.on('blog update', (messageBlogUpdate) => {
        request.get({
          url: 'http://localhost:3000/api/v1/blog/list'
        }, function(err, httpResponse, body) {
          console.log(body);
        });
        console.log(messageBlogUpdate);
      });

      socket.on('disconnect', () => {
        // console.log(tmpUserFullName);
        // socket.broadcast.emit('user disconnect', `${tmpUserFullName} Disonnected`);
      });
    });
  }
}
