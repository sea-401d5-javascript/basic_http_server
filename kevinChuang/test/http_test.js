/*jshint esversion:6*/
/*eslint-env es6*/

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;

require('../server');

describe('HTTP GET /time',()=> {
  it('should read the time out',(done)=> {
    request('localhost:3000')
    .get('/time')
    .end((err,res)=>{
      console.log(res.text);
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('The time now is ' + new Date().getHours() + ':' + new Date().getMinutes());
      done();
    });
  });
});

describe('HTTP GET /greet/[name]', ()=> {
  it('should greet the name placed after /greet',(done)=> {
    request('localhost:3000')
    .get('/greet/Ricki')
    .end((err, res)=> {
      console.log(res.text);
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hello Ricki');
      done();
    });
  });
});

describe('HTTP POST /greet',()=> {

});
