const GLOBAL = require('global')
cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: {
      default: null,
      type: cc.Label
    },
  },

  start: function () {
    this.setScore(GLOBAL.lastScore)
  },

  setScore: function (score) {
    let str = this.scoreLabel.string
    this.scoreLabel.string = str.slice(0, str.indexOf(':') + 2) + score;
  },

  startGame: function () {
    cc.director.loadScene('game');
  },

});
