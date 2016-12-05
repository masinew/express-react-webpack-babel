import path from 'path';
import Express from 'express'
import { Server } from 'http'
import { match, RouterContext } from 'react-router';
import routes from './routes'
import PageNotFound from './components/PageNotFound';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = new Express();
const server = new Server(app);

app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));

app.get('/blog', function(req, res) {
  res.end('555');
});

app.get('/member', (req, res) => {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      let markup;
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      return res.render('index', { markup });
    }
  );
});



const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.info(`Server running on http://localhost:${port} [${env}]`);
});
