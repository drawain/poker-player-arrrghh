var Hand = function(hand) {
  this._hand = hand;
};

Hand.prototype = {
  getRankValue: function(card) {
    switch (card.rank) {
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      case 'A':
        return 14;
      default:
        return parseFloat(card.rank);
    }
  },

  rankIsSame: function() {
    return this.getRankValue(this._hand[0]) == this.getRankValue(this._hand[1]);
  },

  suiteIsSame: function() {
    return this._hand[0].suit == this._hand[1].suit;
  },

  diffIsOne: function() {
    return Math.abs(this.getRankValue(this._hand[0]) - this.getRankValue(this._hand[1])) === 1;
  },

  rankHasBiggerThan: function(rank) {
    return (this.getRankValue(this._hand[0]) > rank) || (this.getRankValue(this._hand[1]) > rank);
  }
};


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
    console.log('Showdown', JSON.stringify(gameState, null, 4));
  }
};
