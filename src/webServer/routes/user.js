import { Router } from 'express';
import request from 'request';
import { apiServer, apisPath } from '../../common/config/server'

const router = new Router();
const success = {success: true};
const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`

router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  request.post({url: `${server}${apisPath.user}/login`,
    form: {username: username, password: password}}, function(err, httpResponse, body) {
      let json = JSON.parse(body);
      console.log(json.token); // for checking when user already logout and then the token can access data that is required authening
      req.session.token = json.token
      delete json.token;
      res.json(json);
    }
  );
});

router.get('/logout', function(req, res) {
  const token = req.session.token;
  req.session.destroy(function(err) {
    if (err) console.log('destroy session error');

    request.post({url: `${server}${apisPath.auth}/logout`, headers: {'Authorization': token}}, function(err, httpResponse, body) {
      // TODO: if err what is next to do
      // TODO: have to swap between request and detroy session
      res.json(Object.assign(success, {
        message: 'Logout Successful'
      }));
    });
  });
});

export default router;
