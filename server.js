var http = require('http'),

    configuration = {
      redis_host: 'localhost',
      redis_port: 6379,
      port: 8000
    },
    Radar = require('./server/server.js'),
    Api = require('./api/api.js'),
    Minilog = require('minilog');

var server;

// configure log output
Minilog
  .pipe(Minilog.backends.console.filterEnv((process.env.radar_log ? process.env.radar_log : '*')))
  .pipe(Minilog.backends.console.formatWithStack)
  .pipe(Minilog.backends.console);

function p404(req, res){
  console.log('Returning Error 404 for '+req.method+' '+req.url);
  res.statusCode = 404;
  res.end('404 Not Found');
}

server = http.createServer(p404);
// Radar API
Api.attach(server);

// Radar server
Radar.attach(server, configuration);

server.listen(configuration.port);
