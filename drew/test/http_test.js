'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;

require('../http_server');

describe('HTTP tests', () => {
  it('should provide a time', (done) => {
    let currentTime = new Date().getTime();
    let currentTimeToString = currentTime.toString();
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(currentTimeToString - (res.text)).to.be.below(1000);
      done();
    });
  });
  it('should bring back a name', () => {
    let greetName = 'BOB';
    request('localhost:3000')
    .get('/greet/' + greetName)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('BOB');
      done();
    });
  });
  it('should catch not found', (done) => {
    request('localhost:3000')
    .get('/notthere')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('NOT FOUND');
      done();
    });
  });
  it('should post correctly', () => {
    request('localhost:3000')
    .get('/greet')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).tp
      done();
    });
  });
});
