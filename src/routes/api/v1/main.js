import { Router } from 'express';
import authRoute from './auth';

const routes = new Router();
routes.use('/auth', authRoute);

export default routes;
