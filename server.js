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
    var users = ''
    req.on('data', (data) => {
      users += data.toString();

    })
    req.on('end', () => {
      var usersObject = JSON.parse(users);
      res.write('Hello ' + usersObject.name + '\n');
      return res.end();
    })
  }
  else {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  })
  res.write('NOT FOUND' + '\n');
  return res.end();
}
}).listen(3000);
