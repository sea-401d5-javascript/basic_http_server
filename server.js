'use strict';

const http = require('http');


http.createServer((req, res) => {
  if (req.url === '/time') {
    let date = new Date();
    res.write('Date: ' + date.toString() + '\n');
    return res.end();
  }

  if (req.method === 'GET' && req.url.indexOf('/greet/name') !== -1) {
    let name =
    res.write('What is up ' + 'random name' + '\n');
    return res.end();
  }



    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('NOT FOUND');
    res.end();

}).listen(3000);
