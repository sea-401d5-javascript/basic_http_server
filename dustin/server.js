var http = require('http');
savedJSON = [];

http.createServer(function (req, res) {


  res.processed = false;
  url_array = req.url.split('/');
  if (req.method == 'GET' && url_array[1] == 'time') urlTime(res);
  if (req.method == 'GET' && url_array[1] == 'greet' && (url_array[2])) urlName(res);
  if (req.method == 'POST' && url_array[1] == 'greet') urlNamePost(res, req);
  if (res.processed === false) url404(res);

}).listen(3000);

url404 = function (res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write('Not found');
  res.end();
};

urlTime = function (res) {
  res.processed = true;
  res.write((new Date).toString());
  res.end();
  return;
};

urlNamePost = function (res, req) {
  res.processed = true;
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    if (req.headers['content-type'] === 'application/json') {
      parseJSON(body);
      goodRequest(res);
    } else {
      badRequest(res);
    }
  });
};

urlName = function (res) {
  res.processed = true;
  res.write('Hello, ' + url_array[2]);
  res.end();
  return;
};

badRequest = function (res) {
  res.processed = true;
  res.writeHead(400, {
    'Content-Type': 'text/html'
  });
  res.write('BAD REQUEST');
  res.end();
};

goodRequest = function (res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('request accepted');
  res.end();
};

parseJSON = function (body) {
  savedJSON.push(JSON.parse(body));
};
