var request = require('superagent');
var Hand = require('./hand');

module.exports = {

  VERSION: "GrandMaster Level 2 RefactorMaster Fixed",

  bet_request: function(gameState, response) {
    try {
      console.log('Actual game state', JSON.stringify(gameState, null, 4));

      var player = gameState.players[gameState.in_action];
      var hand = player.hole_cards;

      var isPreFlop = function(gameState) {
        return gameState.community_cards.length === 0;
      };

      var respond = function(message) {
        response.send(200, message.toString());
      };

      var getPreFlopBet = function(gameState, player, hand) {
        if (hand.rankIsSame() && hand.rankHasBiggerThan(7)) {
          return player.stack;
        }

        if (hand.rankIsSame()) {
          return gameState.minimum_raise * 40;
        }

        if (hand.diffIsOne() && hand.suiteIsSame()) {
          return gameState.minimum_raise * 30;
        }

        if (hand.diffIsOne()) {
          return gameState.minimum_raise * 20;
        }

        if (hand.suiteIsSame()) {
          return gameState.minimum_raise * 10;
        }

        if (player.bet > 0) {
          return gameState.current_buy_in - player.bet;
        }

        return 0;
      };


      if (isPreFlop(gameState)) {
        respond(getPreFlopBet(gameState, player, new Hand(hand)));
      } else {
        if (player.current_buy_in > 0) {
          respond(0);
        } else {
          respond(gameState.current_buy_in - player.bet);
        }
      }


    } catch (e) {
      console.log('EXCEPTION', e);
    }

    respond(gameState.current_buy_in - player.bet);
  },

  showdown: function(gameState) {
    //console.log('Showdown', JSON.stringify(gameState, null, 4));
  },


  fetchHandRank: function (hand, community_cards, callback) {
    var cards = hand.concat(community_cards);
    request
        .get('http://rainman.leanpoker.org/rank')
        .send('cards=' + JSON.stringify(cards))
        .end(function (err, res) {
          callback(JSON.parse(res.text));
        });
  }
};
