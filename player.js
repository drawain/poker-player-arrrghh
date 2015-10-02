
module.exports = {

  VERSION: "GrandMaster Level 2 SupaDupa",

  bet_request: function(gameState) {
    try {
      console.log('Actual game state', JSON.stringify(gameState, null, 4));

      var player = gameState.players[gameState.in_action];
      var hand = player.hole_cards;

      var isPreFlop = function() {
        return gameState.community_cards.length === 0;
      };

      var getRankValue = function(card) {
        switch (card.rank) {
          case 'J': return 11;
          case 'Q': return 12;
          case 'K': return 13;
          case 'A': return 14;
          default: parseFloat(card.rank);
        }
      };

      var rankIsSame = function(hand) {
        return getRankValue(hand[0]) == getRankValue(hand[1]);
      };

      var suiteIsSame = function(hand) {
        return hand[0].suit == hand[1].suit;
      };

      var diffIsOne = function(hand) {
        return Math.abs(getRankValue(hand[0]) - getRankValue(hand[1])) === 1;
      };


      if (isPreFlop()) {
        if (rankIsSame(hand) && getRankValue(hand[0]) > 7) {
          return player.stack;
        }

        if (rankIsSame(hand)) {
          return gameState.minimum_raise * 40;
        }

        if (diffIsOne(hand) && suiteIsSame(hand)) {
          return gameState.minimum_raise * 30;
        }

        if (diffIsOne(hand)) {
          return gameState.minimum_raise * 20;
        }

        if (suiteIsSame(hand)) {
          return gameState.minimum_raise * 10;
        }
      } else {
        return gameState.current_buy_in - player.bet;
      }


    } catch(e) {}

    return 0;
  },

  showdown: function(gameState) {
    console.log('Showdown', JSON.stringify(gameState, null, 4));
  }
};
