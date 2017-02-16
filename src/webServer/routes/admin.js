import { Router } from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';

import { key, apiServer, apisPath } from '../../common/config/server';
import { socketInstance } from '../server'

const router = new Router();
const port = apiServer.port;
const server = `${apiServer.protocal}://${apiServer.host}${ port ? `:${port}` : '' }`



export default router;
