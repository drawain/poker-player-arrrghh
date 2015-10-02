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


module.exports = Hand;
