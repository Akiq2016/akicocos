(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '055ad2u7IVAgbtoFXT4nUQT', 'Player', __filename);
// scripts/Player.js

"use strict";

cc.Class({
  // cc.Component:
  // basic class for all the components
  // if `extends` property is declared, the constructor of this specific class will be auto invoked
  extends: cc.Component,

  // By declaring properties in the component script,
  // these properties can be visualized in the Property inspector,
  // making it easy to adjust values in the scene.
  properties: {
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    acceleration: 0,
    jumpAudio: {
      default: null,
      type: cc.AudioClip
    }
  },

  // at the stage of `onLoad`, other nodes and their assets can be accessed.
  // `onLoad` method always be executed before any `start` method.
  onLoad: function onLoad() {
    this.enabled = false;

    this.leftAccelarate = false;
    this.rightAccelarate = false;
    this.xSpeed = 0;
    this.maxMoveX = this.node.parent.width - this.node.width;

    this.initKeyboardEvent();
  },


  // executed after `onLoad` of all the components
  start: function start() {},
  onEnable: function onEnable() {
    this.node.runAction(this.setJumpAction());
  },


  /**
   * `update` will be called once per frame after the scene is loaded
   * Generally put the stuff that needs to be calculated frequently or updated in time.
   * 
   * @param {number} dt delta time
   */
  update: function update(dt) {
    // 1. update speed: v = v0 + at
    if (this.leftAccelarate) {
      this.xSpeed -= this.acceleration * dt;
    } else if (this.rightAccelarate) {
      this.xSpeed += this.acceleration * dt;
    }

    // if speed reach limit, use max speed with current direction
    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }

    // 2. update position: x = x0 + vt
    if (Math.abs(this.node.x + this.xSpeed * dt) < this.maxMoveX / 2) {
      this.node.x += this.xSpeed * dt;
    } else {
      // as it touch the boundary, to let him back,
      // instead of letting xSpeed slowly slow down to 0 and having speed in the opposite direction,
      // set it's xSpeed to 0 directly.
      this.xSpeed = 0;
    }
  },

  /**
   * setJumpAction
   * @return {ActionInterval}
   */
  setJumpAction: function setJumpAction() {
    // using cc.v2 to create a cc.Vec2 object which is represented 2D vectors and coordinates
    // cc.moveBy(duration<Number>, deltaPos<Vec2|Number>)
    // cc.sequence(actions) The actions are performed in sequence.
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
    var callback = cc.callFunc(function () {
      cc.audioEngine.play(this.jumpAudio, false);
    }, this);
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
  },

  initKeyboardEvent: function initKeyboardEvent() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
      switch (event.keyCode) {
        case cc.macro.KEY.left:
          this.leftAccelarate = true;
          break;
        case cc.macro.KEY.right:
          this.rightAccelarate = true;
          break;
      }
    }, this);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
      switch (event.keyCode) {
        case cc.macro.KEY.left:
          this.leftAccelarate = false;
          break;
        case cc.macro.KEY.right:
          this.rightAccelarate = false;
          break;
      }
    }, this);
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
        //# sourceMappingURL=Player.js.map
        