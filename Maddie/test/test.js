'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
require('../server.js');

describe('HTTP TESTS', () => {
  it('should give time on get /time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Time: ' + ((new Date()).getHours()) + ':' + ((new Date()).getMinutes()) + '\n');
      done();
    })
  })

  it('should greet with name on /greet/', (done) => {
    request('localhost:3000')
    .get('/greet/maddie')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Hello maddie' + '\n')
      done();
    })
  })

  it('should allow me to grab what was posted', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send('{"name":"laura"}')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Hello laura' + '\n');
      done();
    })
  })

  it('catch not found', (done) => {
    request('localhost:3000')
    .get('/notfound')
    .end((err,res) => {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('NOT FOUND' + '\n')
      done();
    })
  })
})
