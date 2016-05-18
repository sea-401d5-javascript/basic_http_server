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
      expect(res.text).to.eql(currentTimeToString);
      done();
    })
  })
})
