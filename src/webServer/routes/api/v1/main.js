import { Router } from 'express';
import authRoute from './auth';
import blogRoute from './blog';

const routes = new Router();
routes.use('/auth', authRoute);
routes.use('/blog', blogRoute);

export default routes;
