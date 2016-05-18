'use strict';
const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/time') {
    let date = new Date();
    res.write('Current date: ' + date.toString() + '\n');
    return res.end();
  }

  if (req.method === 'GET' && req.url.indexOf('/greet/') !== -1) {
    let name = req.url.split('/').pop();
    res.write('Hello ' + name);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/greet') {
    let body = '';
    req.on('data', (data) => {
      body += data.toString();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('Name sent: ' + JSON.parse(body).name);
      res.end();
    });
  }

 else {
   res.writeHead(404, {'Content-Type': 'text/html'});
   res.write('NOT FOUND');
   res.end();
 }
}).listen(3000, () => {
  console.log('listening');
});
