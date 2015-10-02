var request = require('supertest'),
    app = require('./player_service'),
    state = require('./state.json');

describe('GET /user', function() {
  it('respond with json', function (done) {
    request(app)
        .post('/')
        .send({action: 'bet_request', 'game_state': JSON.stringify(state)})
        .expect(200)
        .end(function (err, res) {
          console.log(res.text);
          if (err) throw err;
          done();
        });
  });
});
