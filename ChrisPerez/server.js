'use strict';

const http = require('http');

http.createServer((req, res)=>{
  var paramArray = req.url.split('/');

  if (paramArray[1] === 'time'){
    res.write(new Date().toString() + '\n');
    return res.end();
  };

  if (paramArray[1] === 'greet' && paramArray[2]){
    res.write(`Wuddup, ${paramArray[2]}\n`);
    return res.end();
  }

  if (paramArray[1] === 'greet' && req.method === 'POST'){
    let name = '';
    req.on('data', (data)=>{
      name += JSON.parse(data).name;
    })
    req.on('end', ()=>{
      console.log(name);
      res.end();
    })
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('neat.\n');
    return
  }

  res.writeHead(404, {
    'Content-Type': 'text/html'
  })
  res.write('NOT FOUND\n');
  res.end();

}).listen(3000);
