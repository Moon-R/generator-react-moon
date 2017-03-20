var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server'); 
var config = require('./webpack.config.dev.js');

// var proxy = {

// };

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  progress: true,
  stats: {
    colors: true,
  },
  // proxy
});

server.app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

server.listen(8080, function() {
  console.log('正常打开8080端口')
});
