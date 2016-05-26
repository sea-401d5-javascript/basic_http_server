'use strict'

const http = require('http');

http.createServer((req, res) => {
  if(req.url === '/greet' && req.method === 'GET'){
    res.write('Hi\n');
    return res.end();
  }
  if(req.url.slice(0,7) === '/greet/' && req.method === 'GET'){
    res.write('Hi ' + req.url.slice(7, (req.url.length)) + ' \n');
    return res.end();
  }
  if(req.url === '/time') {
    let time = new Date();
    res.write(time.toString());
    return res.end();
  }
  if (req.method === 'POST' && req.url === ('/greet')) {
    req.on('data', (data) => {
    console.log(JSON.parse(data).name);
  });

    res.writeHead(200, {'Content-Type': 'application/JSON'});
    res.write('I got a 200!\n');
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/html'
  })
  res.write('NOT FOUND');
  res.end();

}).listen(3000);
