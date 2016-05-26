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
    res.write('Hello ' + greetNameToString + '\n');
    return res.end();
  }

  if (req.url === ('/greet') && req.method === 'POST') {
    var name = '';
    req.on('data', (data) => {
      name += data.toString();
      // console.log(data.toString());

    req.on('end', () => {
      var nameObj = JSON.parse(name);
      res.write('Hello ' + nameObj.name + '\n');
      // res.writeHead(200, {'Content-Type': 'application/JSON'});
      // res.write('Hi');
      res.end();
      });
    });
    return;

  };


  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write('NOT FOUND\n');

  res.end();

}).listen(3000);
