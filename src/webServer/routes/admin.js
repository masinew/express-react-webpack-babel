import { Router } from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';

import { key, apiServer, apisPath } from '../../common/config/server';
import { socketInstance } from '../server'

const router = new Router();
const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`

router.use(function(req, res, next) {
  const token = req.session.token;
  jwt.verify(token, key.tokenKey, function(err, decoded) {
    if (!decoded.admin) {
      res.json({success: false, message: 'Required Admin User!~!'});
      return;
    }

    next();
  });
});

router.post('/addBlog', function(req, res) {
  const topic = req.body.topic;
  const shortInfo = req.body.shortInfo;
  const details = req.body.details;
  request.post({
    url: `${server}/${apisPath.blog}/save`,
    headers: {'Authorization': req.session.token},
    form: {
      topic: topic,
      shortInfo: shortInfo,
      details: details
    }
  }, function(err, httpResponse, body) {
    const json = JSON.parse(body);
    // socketInstance.getSocket().broadcast.emit('new blog', {
    //   blogNumber: json.info.blogNumber,
    //   topic: topic,
    //   shortInfo: shortInfo
    // });
    res.json(json);
  });
});

export default router;
