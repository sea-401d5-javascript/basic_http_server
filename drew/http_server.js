'use strict';

const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/time' && req.method === 'GET') {
    let currentTime = new Date().getTime();
    let currentTimeToString = currentTime.toString();
    // console.log(currentTimeToString);
    res.write(currentTimeToString);
    return res.end();
  }
}).listen(3000);
