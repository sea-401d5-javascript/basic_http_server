'use strict';

const http = require('http');

const database = {};

http.createServer((req, res) => {
  if (req.url === '/time' && req.method === 'GET'){
    let time = Date.now();
    res.write(time + '\n');
    return res.end();
  }

  let user = req.url.substring(7);

  if (req.url === '/greet/' + user && req.method === 'GET'){
    let userString = user.toString();
    console.log(userString);
    res.write('Hello ' + userString + '\n');
    return res.end();
  }

  //In command line: curl localhost:3000 -X POST -d 'POST'
  //curl localhost:3000/user

  if (req.method === 'POST') {
    let newEntry = 'user';
    database[newEntry] = true;
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/html'
  })
  res.write('NOT FOUND');
  res.end();

}).listen(3000);
