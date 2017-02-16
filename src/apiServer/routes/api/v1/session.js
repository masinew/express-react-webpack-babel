import { Router } from 'express';
import Session from '../../../app/models/session'

const router = new Router();

router.get('/isSessionDestroyed', function(req, res) {
  const sessionId = req.query.sessionId;
  if (typeof sessionId === 'undefined') {
    res.json({success: false, message: 'Required sessionId'});
    return;
  }

  Session.findOne({_id: sessionId}, function(err, result) {
    if (err || !result) {
      res.json({success: false, message: 'Session expired'});
      return;
    }

    res.json({success: true, message: 'Session is available'});
  })
});

export default router;
