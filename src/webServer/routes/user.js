import { Router } from 'express';
import request from 'request';
import { apiServer, apisPath } from '../../common/config/server'

const router = new Router();
const success = {success: true};
const error = {success: false};
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
      delete json.token; // do not send token value to client in case website
      res.json(json);
    }
  );
});

router.get('/logout', function(req, res) {
  const token = req.session.token;
  const successMessage = Object.assign(success, {message: 'Logout Successful'});
  const errorMessage = Object.assign(error, {message: 'Logout Unsuccessful'});
  request.post({url: `${server}${apisPath.auth}/logout`, headers: {'Authorization': token}}, function(err, httpResponse, body) {
    const json = JSON.parse(body);
    if (err || !json.success) {
      res.json(errorMessage);
      return;
    }
    
    req.session.destroy(function(err) {
      if (err) {
        res.json(errorMessage);
        return;
      }

      res.json(successMessage);
    });
  });
  // req.session.destroy(function(err) {
  //   if (err) console.log('destroy session error');
  //
  //
  // });
});

export default router;
