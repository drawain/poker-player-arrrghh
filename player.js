
module.exports = {

  VERSION: "GrandMaster Level 1",

  bet_request: function(gameState) {
    console.log('Actual game state', JSON.stringify(game_state, null, 4));

    var player = gameState.players[gameState.in_action];
    var hand = player.hole_cards;

    if (hand[0].rank == hand[1].rank) {
      return gameState.minimum_raise * 2;
    }

    return 0;
  },

  showdown: function(game_state) {

  }
};
