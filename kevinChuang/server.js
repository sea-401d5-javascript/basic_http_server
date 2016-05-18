/*eslint-env es6*/
/*jshint esversion:6*/

const http = require('http');
const async = require('async');

http.createServer((req, res) => {
  if(req.url === '/time' && req.method ==='GET'){
    res.write('The time now is ' + new Date().toUTCString());
    return res.end();
  }
  var name = req.url.substring(7);

  if(req.url === '/greet' && req.method ==='POST'){
    //async.parallel([],callback())
    req.on('data',(data)=> {
      console.log('Hi my name is ' + JSON.parse(data).name);
      // res.write('Hello ' + JSON.parse(data).name);
    });
    // res.writeHead(200, {'Content-Type': 'application/JSON'});
    // res.write('got a 200!');
    return res.end();
  }

  if(req.url === ('/greet/'+ name) && req.method === 'GET') {
    res.write('Hello ' + name);
    return res.end();
  }

  res.writeHead(404,{
    'Content-Type': 'text/html'
  });
  res.write('Not Found\n');
  //res.status(404);
  res.end();
}).listen(3000);
