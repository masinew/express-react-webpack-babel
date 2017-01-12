import webServer from './webServer';
import apisPath from './apisPath';

export default {
  server: {
    protocal: webServer.protocal,
    host: webServer.host,
    port: webServer.port
  },
  apis: apisPath
}
