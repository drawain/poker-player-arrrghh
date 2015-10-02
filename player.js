var Hand = require('./hand');

module.exports = {

  VERSION: "GrandMaster Level 2 RefactorMaster",

  bet_request: function(gameState) {
    try {
      console.log('Actual game state', JSON.stringify(gameState, null, 4));

      var player = gameState.players[gameState.in_action];
      var hand = player.hole_cards;

      var isPreFlop = function(gameState) {
        return gameState.community_cards.length === 0;
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
      };


      if (isPreFlop(gameState)) {
        return getPreFlopBet(gameState, player, new Hand(hand));
      } else {
        return gameState.current_buy_in - player.bet;
      }


    } catch (e) {
    }

    return 0;
  },

  showdown: function(gameState) {
    //console.log('Showdown', JSON.stringify(gameState, null, 4));
  }
};
