
module.exports = {

  VERSION: "GrandMaster Level 1",

  bet_request: function(gameState) {
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


    if (getRankValue(hand[0]) == getRankValue(hand[1])) {
      return gameState.minimum_raise * 3;
    }

    if (Math.abs(getRankValue(hand[0]) - getRankValue(hand[1])) === 1) {
      return gameState.minimum_raise * 2;
    }


    if (hand[0].suit == hand[1].suit) {
      return gameState.minimum_raise;
    }


    return 0;
  },

  showdown: function(game_state) {

  }
};
