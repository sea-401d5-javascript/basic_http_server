'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const server = require(__dirname + '/../server.js');

describe('http server', () => {
  it('should return the time when we enter /time into the url', (done) => {
    let testDate = new Date();
    chai.request('http://localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(server.newDate).to.eql(testDate.getUTCMinutes());
        done();
      })
  })
  it('should return a greeting to the name we entered with /greet/name', (done) => {
    chai.request('http://localhost:3000')
      .get('/greet/CRAZYEYES')
      .end((err, res) => {
        expect(res.text).to.eql('Hello there, CRAZYEYES.\n');
        done();
      })
  })
  it('should return a greeting to the name we entred with /greet in JSON format', (done) => {
    chai.request('http://localhost:3000')
      .post('/greet')
      .send({newUser: 'Zach'})
      .end((err, res) => {
        expect(res.text).to.eql('Hello there, Zach.\n');
        done();
      })
  })
})
