const expect = require('chai').expect;

const greet = require(__dirname + '/../lib/greet');

describe('greet function', () => {
  it('should say hello with a provided name', () => {
    expect(greet('world')).to.eql('Hello world');
  });
});
