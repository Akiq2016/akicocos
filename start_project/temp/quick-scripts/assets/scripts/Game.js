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
    }
  },

  onLoad: function onLoad() {
    // Get the y-axis coordinate of the ground plane
    // (that base on the anchor is still on the center position as default)
    this.groundY = this.ground.y + this.ground.height / 2;
    this.generateStar();
  },
  start: function start() {},
  update: function update(dt) {},


  generateStar: function generateStar() {
    // instantiate new nodes from Prefab
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getStarPosition());
  },

  getStarPosition: function getStarPosition() {
    var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
    var randX = cc.randomMinus1To1() * (this.node.width / 2);

    return cc.p(randX, randY);
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
        