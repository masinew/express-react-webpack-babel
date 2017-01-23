import Express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import Multer from 'multer';
import mongoose from 'mongoose'
import morgan from 'morgan';
import { mongodb } from '../common/config/server';
import apiV1 from './routes/api/v1/main';

const app = new Express();
const server = new Server(app);
const multer = new Multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer.array());
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://192.168.105.25:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Method', 'GET,POST');
  // res.header('Access-Control-Allow-Header', 'Content-Type');
  next();
});

app.use('/v1', apiV1);
app.use('/api/v1', apiV1);

app.get('*', (req, res) => {
  res.json({success: false, message: "APIs not found"});
});

/*start server and database*/
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'production';
mongoose.Promise = global.Promise;
mongoose.connect(mongodb.urlConnection, (err) => {
  if (err) throw err;

  server.listen(5000, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.info(`Server running on http://localhost:${port} [${env}]`);
  });
});
