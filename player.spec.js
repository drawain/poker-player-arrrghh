var player = require('./player');
var expect = require('chai').expect;
var state = require('./state.json');

describe('Player stability', function() {

  //it('is stable', function() {
  //  expect(player.bet_request(state)).to.be.above(0);
  //});

  it('is stable', function() {
    expect(player.bet_request(state)).to.eql(0);
  });

});

