var request = require('supertest'),
    app = require('./player_service'),
    state = require('./state.json');

describe('GET /user', function() {
  it('respond with json', function (done) {
    request(app)
        .post('/')
        .field('action', 'bet_request')
        .field('game_state', JSON.stringify(state))
        //.send(state)
        .expect(200)
        .end(function (err, res) {
          console.log(res.body);
          if (err) throw err;
          done();
        });
  });
});
