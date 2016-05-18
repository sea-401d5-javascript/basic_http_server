'use strict';
const http = require('http');
const names = [];

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

  if (req.method === 'POST' && req.url.indexOf('/greet/') !== -1) {
    let JSONname = JSON.stringify(req.url.split('/').pop());
    names.push(JSONname);
    res.writeHead(200, {name: JSONname});
    res.write('Successfully saved as JSON');
    console.log(names);
    return res.end();
  }

  res.write('NOT FOUND');
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end();
}).listen(3000, () => {
  console.log('listening');
});
