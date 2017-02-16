// Import only in server side
import WebServer from './webServer';
import ApiServer from './apiServer';
import ApisPath from './apisPath';

const expiresIn = 60*60*1000; /*one hour in millisec*/
export const expiration = {
  sessionExpired: expiresIn,
  tokenExpired: (expiresIn/1000),
  acceptRefreshingToken: (expiresIn/1000)
}

export const key = {
  sessionKey: 'sessionKey',
  tokenKey: 'tokenKey'
}

export const cookie = {
  name: 'ss'
}

export const webServer = WebServer;

export const apiServer = ApiServer;

export const apisPath = ApisPath;

const databaseHost = 'localhost';
const databasePort = 27017;
const databaseName = 'express-react-webpack-babel';
export const mongodb = {
  urlConnection: `mongodb://${databaseHost}:${databasePort}/${databaseName}`,
}

export const optimization = {
  minifyHTMLOptions: {
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            false,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true,
        minifyCSS:                 true
    }
  }
}
