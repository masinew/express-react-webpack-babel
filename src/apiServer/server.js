import Express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose'
import config from '../common/config/config';

const app = new Express();
const server = new Server(app);
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'production';
mongoose.connect(config.database, (err) => {
  if (err) throw err;

  server.listen(5000, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.info(`Server running on http://localhost:${port} [${env}]`);
  });
});

app.get('/', (req, res) => {
  console.log(req.get('Authorization'));
  res.send('1123');
});
