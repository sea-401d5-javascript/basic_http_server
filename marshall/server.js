'use strict';

const http = require('http');
const database = {};

const date = new Date();
const years = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

var name = {
  "name": "Marshall"
};

http.createServer((request, response) => {
  if(request.url === '/greet/name' && request.method === 'GET'){
    response.writeHead(200, {
      'Content-Type:': 'text/html'
    });
    response.write('Welcome Marshall!');
    return response.end();
  };

  if(request.url === '/greet' && request.method === 'POST'){
    let newPost = 'Welcome ' +  name;
    database[newPost] = true;
    return response.end();
  }

  if(request.url === '/user' && request.method === 'GET'){
    let users = Object.keys(database).toString() + '\n';

    response.write(users);
    return response.end();
  };

  if (request.url === '/time' && request.method === 'GET'){
    // let newEntry = ' User: ' + Date.now();
    response.write('Current time: ' + years + ', ' + hours + ' : ' + minutes + ' : ' + seconds + '. ');
    // database[newEntry] = true;
    return response.end();
  };

  // if(request.url !== '/HELLO'){
    response.writeHead(404, {
      'Content-Type': 'text/html'
    });

    response.write('NOT FOUND');
    response.end();
  // };

}).listen(3000);
