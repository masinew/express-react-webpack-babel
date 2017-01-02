module.exports = {
  apiServer: {
    host: 'localhost',
    port: 3000
  },
  sessionKey: 'session-key',
  authExpire: 60*60*1000,
  database:   'mongodb://localhost:27017/express-react-webpack-babel',
  minifyHTMLOptions: {
      htmlMinifier: {
          removeComments:            true,
          collapseWhitespace:        true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes:     true,
          removeEmptyAttributes:     true,
          minifyJS:                  true
      }
  }
};
