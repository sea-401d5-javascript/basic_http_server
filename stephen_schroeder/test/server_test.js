const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/../server');

describe('HTTP server', () => {
  after(() => {
    server.close();
  });

  it('should 404 if page does not exist', (done) => {
    request('localhost:3000')
    .get('/DNE')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('Page Not Found');
      done();
    });
  });

});
