(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '788bbSjQHxCSYhrtP1Vc2Jv', 'Game', __filename);
// scripts/Game.js

'use strict';

cc.Class({
  extends: cc.Component,

  properties: {
    maxStarDuration: 0,
    minStarDuration: 0,
    starPrefab: {
      default: null,
      type: cc.Prefab
    },
    ground: {
      default: null,
      type: cc.Node
    },
    player: {
      default: null,
      type: cc.Node
    },
    scoreLabel: {
      default: null,
      type: cc.Label
    }
  },

  onLoad: function onLoad() {
    // Get the y-axis coordinate of the ground plane
    // (that base on the anchor is still on the center position as default)
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.generateStar();

    // init score
    this.score = 0;
  },
  update: function update(dt) {
    if (this.timer > this.starDuration) {
      this.gameOver();
    } else {
      this.timer += dt;
    }
  },


  generateStar: function generateStar() {
    // instantiate new nodes from Prefab
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getStarPosition());
    newStar.getComponent('Star').game = this;

    this.starDuration = this.getStarDuration();
    this.timer = 0;
  },

  getStarDuration: function getStarDuration() {
    return this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
  },

  getStarPosition: function getStarPosition() {
    var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
    var randX = cc.randomMinus1To1() * (this.node.width / 2);

    return cc.p(randX, randY);
  },

  gainScore: function gainScore() {
    var str = this.scoreLabel.string;
    this.score += 1;
    this.scoreLabel.string = str.slice(0, str.indexOf(':') + 2) + this.score;
  },

  gameOver: function gameOver() {
    this.player.stopAllActions();
    cc.director.loadScene('game');
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
        //# sourceMappingURL=Game.js.map
        