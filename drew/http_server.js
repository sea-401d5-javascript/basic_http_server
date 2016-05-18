'use strict';

const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/time' && req.method === 'GET') {
    let currentTime = new Date().getTime();
    let currentTimeToString = currentTime.toString();
    res.write(currentTimeToString);
    return res.end();
  }

//greet/name in url gives back name in string
//  -need to find out how to write url
//  -need to make it so any part after      //   greet is what the string is

let greetName = req.url.substring(7);

  if(req.url === ('/greet/' + greetName) && req.method === 'GET') {
    let greetNameToString = greetName.toString();
    res.write(greetNameToString);
    return res.end();
  }

  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write('NOT FOUND')
console.log(req.url);
  res.end();

}).listen(3000);
