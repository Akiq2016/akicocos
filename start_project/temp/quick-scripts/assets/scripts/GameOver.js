(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameOver.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '986acUAmpdC/ac9lEzRyn/3', 'GameOver', __filename);
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
      // cc.log(cc.director.getScene().getComponent('Game').startGame())
    });
    cc.log(cc.director.getScene().name, 2);
  }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameOver.js.map
        