"use strict";
cc._RF.push(module, '986acUAmpdC/ac9lEzRyn/3', 'GameOver');
// scripts/GameOver.js

'use strict';

var GLOBAL = require('global');
cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: {
      default: null,
      type: cc.Label
    }
  },

  start: function start() {
    this.setScore(GLOBAL.lastScore);
  },

  setScore: function setScore(score) {
    var str = this.scoreLabel.string;
    this.scoreLabel.string = str.slice(0, str.indexOf(':') + 2) + score;
  },

  startGame: function startGame() {
    cc.director.loadScene('game', function () {
      cc.log(cc.director.getScene().getComponent('Game').startGame());
    });
    cc.log(cc.director.getScene().name, 2);
  }

});

cc._RF.pop();