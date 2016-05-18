const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
require(__dirname + '/../server.js');

describe('HTTP tests', ()=>{
  it('should greet on get greet', (done)=>{
    request('localhost:3000')
      .get('/greet/me')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Wuddup, me\n');
        done();
      })
  })
  it('should catch not found', (done)=>{
    request('localhost:3000')
      .get('/notthere')
      .end((err, res)=>{
        expect(res).to.have.status(404);
        expect(res.text).to.eql('NOT FOUND\n');
        done();
      })
  })
  it('should give me the current date/time', (done)=>{
    request('localhost:3000')
      .get('/time')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res.text).to.eql(new Date().toString() + '\n')
        done();
      })
  })
  it('should grab the name from a json object', (done)=>{
    request('localhost:3000')
      .post('/greet')
        .field('{"name": "person"}')
      .end((err, req)=>{
        expect(req.data).to.eql('{"name": "person"}')
        done();
      })
  })
})
