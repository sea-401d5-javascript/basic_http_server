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

  it('should greet with name on /greet/time'), (done) => {

  }
})
