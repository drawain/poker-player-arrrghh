
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state) {
    console.log('Actual game state', JSON.stringify(game_state, null, 4));
    return 1000;
  },

  showdown: function(game_state) {

  }
};
