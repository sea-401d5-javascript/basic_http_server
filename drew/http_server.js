'use strict';

const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/time' && req.method === 'GET') {
    let currentTime = new Date().getTime();
    let currentTimeToString = currentTime.toString();
    res.write(currentTimeToString);
    return res.end();
  }

  let greetName = req.url.substring(7);

  if(req.url === ('/greet/' + greetName) && req.method === 'GET') {
    let greetNameToString = greetName.toString();
    res.write(greetNameToString);
    return res.end();
  }

  if (req.url === ('/greet') && req.method === 'POST') {
    req.on('data', (data) => {
      console.log(data.toString());
    });
    res.writeHead(200, {'Content-Type': 'application/JSON'});
    res.write('Hi');
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write('NOT FOUND');

  res.end();

}).listen(3000);
