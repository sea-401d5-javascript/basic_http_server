'use strict';

const http = require('http');

http.createServer((req, res) => {
  if(req.url === '/time' && req.method === 'GET'){
    let newDate = new Date();
    module.exports.newDate = newDate.getUTCMinutes();
    res.write(newDate.toString());
    res.end();
    return;
  }
  if(req.url.startsWith('/greet/') && req.method === 'GET') {
    let name = res.greetName = req.url.split('/')[2];
    let greeting = res.text = 'Hello there, ' + name + '.\n';
    res.write(greeting);
    res.end();
    return;
  }
  if(req.url.startsWith('/greet') && req.method === 'POST') {
    req.on('data', function(chunk) {
      let newUser = JSON.parse(chunk.toString()).newUser;
      res.write("Hello there, " + newUser + ".\n");
      res.end();
      return;
    });
  }
  else {
    res.write('NOT FOUND');
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end();
  }
}).listen(3000);
