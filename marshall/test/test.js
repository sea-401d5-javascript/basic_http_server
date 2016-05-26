'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;

require('../server')

describe('HTTP tests', () => {
  it('should greet on get /greet/name', (done) => {
    request('localhost:3000')
      .get('/greet/name')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.text).to.have.status(200);
        expect(res.text).to.eql('Welcome Marshall!')
        done();
      });
  });

  it('should catch not found', (done) => {
    request('localhost:3000')
      .get('/notthere')
      .end((err, res) =>{
        expect(res).to.have.status(404);
        expect(res.text).to.eql('NOT FOUND');
        done();
      });
  });

  it('should write time on get /time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.text).to.eql(res.text)
        done();
      })
  })
});
