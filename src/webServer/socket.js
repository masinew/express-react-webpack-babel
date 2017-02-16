import Socket from 'socket.io';
import request from 'request';
import Cookie from 'cookie';

import { cookie } from '../common/config/server';
import { apiServer, apisPath } from '../common/config/server';

const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`

export default class Sockets {
  constructor(httpServer) {
    const io = new Socket(httpServer);
    io.on('connection', (socket) => {
      // check user session and then add the user on the user room
      const cookieString = socket.request.headers.cookie;
      if (typeof cookieString !== 'undefined') {
        const cookieParsed = Cookie.parse(cookieString);
        const cookieSession = cookieParsed[cookie.name];
        if (typeof cookieSession !== 'undefined') {
          const prefixSize = 2;
          const sessionId = cookieSession.substr(prefixSize, cookieSession.indexOf('.')-prefixSize)
          request.get({url: `http://localhost:5000/api/v1/session/isSessionDestroyed?sessionId=${sessionId}`}, function(err, httpResponse, body) {
            const json = JSON.parse(body);
            if (json.success) {
              socket.join('user');
            }
          });
        }
      }


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
          url: `${server}/${apisPath.blog}/save`,
          headers: {'Authorization': blogInfo.token},
          form: {
            topic: blogInfo.topic,
            shortInfo: blogInfo.shortInfo,
            details: blogInfo.details
          }
        }, function(err, httpResponse, body) {
          const json = JSON.parse(body);
          if (json.success) {
            socket.emit('new blog', {message: 'Success'});
            socket.broadcast.emit('new blog', {
              blogNumber: json.info.blogNumber,
              topic: blogInfo.topic,
              shortInfo: blogInfo.shortInfo,
              message: 'Admin wrote a new blog'
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
