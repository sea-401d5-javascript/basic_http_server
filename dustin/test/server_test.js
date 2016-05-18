chai = require('chai');
chaiHTTP = require('chai-http');
expect = chai.expect;
chai.use(chaiHTTP);
request = chai.request;

require('../server');

//The server should respond to a request to /time that will send back
//the current time of the server.
describe('HTTP server', function () {
  it('/time should return the system time (within 1 second)', function (done) {
    request('localhost:3000')
      .get('/time')
      .end(function (err, res) {
        expect(Date.now() - Date.parse(res.text)).to.be.below(1000);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  //It should also respond to a get request to /greet/name where name is any
  //single word string. It should send back a string that greets that name.
  it('/greet/[name] should return a personal greet message', function (done) {
    request('localhost:3000')
      .get('/greet/jeffrey_lebowski')
      .end(function (err, res) {
        expect(res.text).to.eql('Hello, jeffrey_lebowski');
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  //It should also have a separate post request to /greet that takes the name in JSON format.
  it('/greet should take a JSON post', function (done) {
    request('localhost:3000')
      .post('/greet')
      .set('Content-Type', 'application/json')
      .send({
        'name': 'walter sobchak'
      })
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(savedJSON).to.eql([{
          'name': 'walter sobchak'
        }]);
        done();
      });
  });

  it('/greet should take not take a non JSON post', function (done) {
    request('localhost:3000')
      .post('/greet')
      .set('Content-Type', 'text/html')
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});
