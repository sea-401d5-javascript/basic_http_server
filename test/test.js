'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
require(__dirname + '/../server.js');

describe('HTTP tests', () => {
  it ('should get time from /time', (done) =>{
    request('localhost:3000')
    .get('/time')
    .end((err, res)=>{
      expect(res.text).to.eql('Date: ' + new Date().toString() + '\n');
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it ('should catch not found', (done)=>{
    request('localhost:3000')
    .get('/notthere')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('NOT FOUND');
      done();
    });
  });
});
