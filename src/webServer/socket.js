import Socket from 'socket.io';
import request from 'request';

import { apiServer, apisPath } from '../common/config/server';

const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`

export default class Sockets {
  constructor(httpServer) {
    const io = new Socket(httpServer);
    io.on('connection', (socket) => {
      socket.on('user connected', (userFullName) => {
        socket.join('user');
        socket.broadcast.to('user').emit('user connected', `${userFullName} Connected`);
      });

      socket.on('user disconnect', (userFullName) => {
        socket.leave('user');
        socket.broadcast.to('user').emit('user disconnect', `${userFullName} Disonnected`);
      });

      socket.on('new blog', (blogInfo) => {
        request.post({
          url: `${server}${apisPath.blog}/save`,
          headers: {'Authorization': blogInfo.token},
          form: {
            topic: blogInfo.topic,
            shortInfo: blogInfo.shortInfo,
            details: blogInfo.details
          }
        }, function(err, httpResponse, body) {
          const json = JSON.parse(body);
          if (json.success) {
            socket.emit('new blog', {message: 'success1'});
            socket.broadcast.emit('new blog', {
              blogNumber: json.info.blogNumber,
              topic: blogInfo.topic,
              shortInfo: blogInfo.shortInfo,
              message: 'success2'
            });
          }
          else {
            socket.emit('new blog', {message: 'error1'});
          }
        });
      });

      socket.on('disconnect', () => {
        // console.log(tmpUserFullName);
        // socket.broadcast.emit('user disconnect', `${tmpUserFullName} Disonnected`);
      });
    });
  }
}
