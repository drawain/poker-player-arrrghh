var request = require('superagent');
var Hand = require('./hand');

module.exports = {

  VERSION: "GrandMaster Level 3",

  bet_request: function(gameState, response) {
    var respond = function(message) {
      response.send(200, message.toString());
    };

    var player = gameState.players[gameState.in_action];

    try {
      console.log('Actual game state', JSON.stringify(gameState, null, 4));

      var hand = player.hole_cards;

      var isPreFlop = function(gameState) {
        return gameState.community_cards.length === 0;
      };

      var betToCall = gameState.current_buy_in - player.bet;

      var fetchHandRank = function (hand, community_cards, callback) {
        var cards = hand.concat(community_cards);
        request
            .get('http://rainman.leanpoker.org/rank')
            .send('cards=' + JSON.stringify(cards))
            .end(function (err, res) {
              console.log("rainmain", res.text);
              callback(JSON.parse(res.text));
            });
      };

      var getPreFlopBet = function(gameState, player, hand) {
        var betGreaterThanBigBlind = player.bet > (gameState.small_blind * 2);

        if (betGreaterThanBigBlind) {
          if (betToCall > (player.stack/2)) return 0;
        }


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

        if (player.bet > 0 && betToCall < (player.stack/2)) {
          return betToCall;
        }

        return 0;
      };


      if (isPreFlop(gameState)) {
        respond(getPreFlopBet(gameState, player, new Hand(hand)));
      } else {
        fetchHandRank(hand, gameState.community_cards, function(rankResponse) {
          if (rankResponse.rank == 0) {
            respond(0);
          } else if (rankResponse.rank == 1) {
            respond(betToCall);
          } else {
            respond(gameState.minimum_raise * 20);
          }
        });
      }


    } catch (e) {
      console.log('EXCEPTION', e);
      respond(gameState.current_buy_in - player.bet);
    }

  },

  showdown: function(gameState) {
    //console.log('Showdown', JSON.stringify(gameState, null, 4));
  }

};
