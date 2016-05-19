/*eslint-env es6*/
/*jshint esversion:6*/

const http = require('http');

http.createServer((req, res) => {
  if(req.url === '/time' && req.method ==='GET'){
    var date = new Date();
    res.write('The time now is ' + date.getHours() + ':' + date.getMinutes());
    return res.end();
  }

  if(req.url.substring(0,7) === ('/greet/') && req.method === 'GET') {
    res.write('Hello ' + req.url.substring(7));
    return res.end();
  }

  if(req.url === '/greet' && req.method ==='POST'){
    var postData;
    req.on('data',(data)=> {
      postData = data.toString();
    });
    req.on('end', ()=>{
      console.log(postData);
      console.log('Hi my name is ' + JSON.parse(postData).name);
      // res.write('Hello ' + JSON.parse(postData).name);
    });
    return res.end();
  }

  res.writeHead(404,{
    'Content-Type': 'text/html'
  });
  res.write('Not Found\n');
  res.statusHead = 404;
  res.end();
}).listen(3000,()=> {
  console.log('Listening on port 3000');
});
