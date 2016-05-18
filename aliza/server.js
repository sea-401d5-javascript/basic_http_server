'use strict';

const http = require('http');

const database = {};

http.createServer((req, res) => {
  if (req.url === '/time' && req.method === 'GET'){
    let time = Date.now();
    res.write(time + '\n');
    return res.end();
  }

  if (req.url === '/greet/aliza' && req.method === 'GET'){
    let user = req.url.substring(7);
    res.write('Hello ' + user + '\n');
    return res.end();
  }

  //curl localhost:3000/greet -X POST -d '{"name":"aliza"}'

  if (req.url === '/greet' && req.method === 'POST') {
    var name = '';
    req.on('data', (data) => {
      name += data.toString();
    });
    req.on('end', () => {
      var nameObj = JSON.parse(name);
      res.write('Hello ' + nameObj.name);
      return res.end();
    })
  }

  else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.write('NOT FOUND');
    res.end();
  }

}).listen(3000);
