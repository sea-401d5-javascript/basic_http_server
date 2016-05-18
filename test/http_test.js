'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const moment = require('moment');
require('../http_server.js');

describe('HTTP server tests', () => {
  it('should respond to a request with a url ending in /date with the current date', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        let dateString = res.text.split(':').slice(1).join('').trim();
        expect(moment(dateString, 'ddd MMM DD YYYY HH:mm:ss').isValid()).to.eql(true);
        done();
      });
  });
  it('should respond to a GET request to /greet/* with a greeting including the single-word string at the end of the path', (done) => {
    request('localhost:3000')
      .get('/greet/test')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello test');
        done();
      });
  });
  it('should respond to a POST request to /greet by recognizing the JSON object and writing it back to the server', (done) => {
    request('localhost:3000')
      .post('/greet')
      .set('Content-Type', 'application/json')
      .send({"name": "test"})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res).to.have.header('Content-Type', 'application/json');
        expect(res).to.eql('Name sent: test');
        done();
      });
  });
  it('should respond to any other paths with an error', (done) => {
    request('localhost:3000')
      .get('/random')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.eql('NOT FOUND');
        done();
      });
  });
});
