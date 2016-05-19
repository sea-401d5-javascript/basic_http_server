'use strict';

const http = require('http');

http.createServer((req, res) => {
let urlArray = req.url.split('/');

  if (urlArray[1] === 'time') {
    let date = new Date();
    res.write('Date: ' + date.toString() + '\n');
    return res.end();
  };

  if (req.method === 'GET' && urlArray[1] === ('greet') && urlArray[2]) {
    res.write('What is up ' + urlArray[2]+ '\n');
    return res.end();
  };

  if (req.method === 'POST' && urlArray[1] === ('greet')){
    let name;
    req.on('data', (data) => {
      name = JSON.parse(data).name;
      console.log(name);
    });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('I am the computer ' + '\n' + 'Nice to meet you ' + '\n');
    return res.end();
  };


    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('NOT FOUND');
    res.end();

}).listen(3000);
