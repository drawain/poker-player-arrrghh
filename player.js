
module.exports = {

  VERSION: "GrandMaster Level 2 Hyper",

  bet_request: function(gameState) {
    try {
      console.log('Actual game state', JSON.stringify(gameState, null, 4));

      var player = gameState.players[gameState.in_action];
      var hand = player.hole_cards;

      var getRankValue = function(card) {
        switch (card.rank) {
          case 'J': return 11;
          case 'Q': return 12;
          case 'K': return 13;
          case 'A': return 14;
          default: parseFloat(card.rank);
        }
      };

      var rankIsSame = function() {
        return getRankValue(hand[0]) == getRankValue(hand[1]);
      };

      var suiteIsSame = function() {
        return hand[0].suit == hand[1].suit;
      };

      var diffIsOne = function() {
        return Math.abs(getRankValue(hand[0]) - getRankValue(hand[1])) === 1;
      };


      if (rankIsSame()) {
        return gameState.minimum_raise * 4;
      }

      if (diffIsOne() && suiteIsSame()) {
        return gameState.minimum_raise * 3;
      }

      if (diffIsOne()) {
        return gameState.minimum_raise * 2;
      }

      if (suiteIsSame()) {
        return gameState.minimum_raise;
      }


    } catch(e) {}

    return 0;
  },

  showdown: function(game_state) {

  }
};
