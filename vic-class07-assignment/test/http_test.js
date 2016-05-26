const chai =  require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;

require('../server');

describe('HTTP test', () => {
  it('should greet a name on /greet/', (done) => {
    request('localhost:3000')
    .get('/greet/Victor')
    .end((err, res) => {
      console.log(res);
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hi Victor \n');
      done();
    });
  });
  it('should catch not found', (done) => {
    request('localhost:3000')
    .get('/whereareyou')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('NOT FOUND');
      done();
    });
  });
  it('should give the current time', () => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(new Date());
      done();
    });
  });
  it('should give me what was posted', () => {
    request('localhost:3000/greet')
    .post('/greet')
    .send('{"name": "vic"}')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(json.parse(res.body.name)).to.eql('vic')
    })
  })
});
