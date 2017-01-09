require('babel-core/register')({
  ignore: [/processSass\.js/, /node_modules/]
})

require('./server');
