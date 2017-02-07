import { Router } from 'express';
import Blog from '../../../app/models/blog';

const router = new Router();

router.get('/list', function(req, res) {
  Blog.find({}, {_id: 0, blogNumber: 1, topic: 1, shortInfo: 1}, {sort: {blogNumber: -1}}, function(err, result) {
    if (err) {
      console.log('error');
    }

    res.json(result);
  });
});

router.post('/save', function(req, res) {
  Blog.count({}, function(err, count) {
    if (err) {
      res.json({success: false, message: 'error'});
      return;
    }

    const topic = req.body.topic;
    const shortInfo = req.body.shortInfo;
    const details = req.body.details;
    const newBlog = new Blog({
      blogNumber: count+1,
      topic: topic,
      shortInfo: shortInfo,
      details: [details]
    });

    newBlog.save(function(err, result) {
      if (err) {
        res.json({success: false, message: 'error'});
        return;
      }

      res.json({success: true, message: 'success', info: {blogNumber: result.blogNumber}});
    });
  });
})

router.get('/:blogNumber', function(req, res) {
  const blogNumber = req.params.blogNumber;
  Blog.findOne({blogNumber: blogNumber}, {_id: 0, blogNumber: 1, topic: 1, details: 1}, function(err, result) {
    if (err) {
      console.log('error');
    }
    
    res.json(result);
  });
});



export default router;
