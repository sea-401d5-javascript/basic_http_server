'use strict'
const http = require('http');

http.createServer((req, res) => {
  if(req.url === '/time' && req.method === 'GET') {
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes();
    res.write('Time: ' + time + '\n');
    return res.end();
  };
  let name = (req.url).slice(7);
  if(req.url === ('/greet/' + name) && req.method === 'GET') {
    res.write('Hello ' + name + '\n');
    return res.end();
  };

  if(req.url === ('/greet') && req.method === 'POST') {
    //var userName;
    req.on('data', (data) => {
      res.writeHead(200, { 'Content-Type': 'application/json'})

    })
    req.on('end', () => {
      //console.log(userName);
    })

    res.write('working');
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/html'
  })
  res.write('NOT FOUND' + '\n');
  return res.end();

}).listen(3000);
