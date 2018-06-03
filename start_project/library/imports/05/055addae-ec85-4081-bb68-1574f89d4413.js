"use strict";
cc._RF.push(module, '055ad2u7IVAgbtoFXT4nUQT', 'Player');
// scripts/Player.js

"use strict";

cc.Class({
  // cc.Component:
  // basic class for all the components
  // if `extends` property is declared, the constructor of this specific class will be auto invoked
  extends: cc.Component,

  // constructor:
  ctor: function ctor() {},

  // By declaring properties in the component script,
  // these properties can be visualized in the Property inspector,
  // making it easy to adjust values in the scene.
  properties: {
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    acceleration: 0
  },

  // at the stage of `onLoad`, other nodes and their assets can be accessed.
  // `onLoad` method always be executed before any `start` method.
  onLoad: function onLoad() {
    this.jumpAction = this.setJumpAction();

    // `this.node` access current component node
    // some related api: `runAction` `stopAction` `stopAllActions`
    this.node.runAction(this.jumpAction);

    this.leftAccelarate = false;
    this.rightAccelarate = false;
    this.xSpeed = 0;

    this.initKeyboardEvent();
  },


  // executed after `onLoad` of all the components
  start: function start() {},


  /**
   * `update` will be called once per frame after the scene is loaded
   * Generally put the stuff that needs to be calculated frequently or updated in time.
   * 
   * @param {number} dt delta time
   */
  update: function update(dt) {
    // update speed: v = v0 + at
    if (this.leftAccelarate) {
      this.xSpeed -= this.acceleration * dt;
    } else if (this.rightAccelarate) {
      this.xSpeed += this.acceleration * dt;
    }

    // if speed reach limit, use max speed with current direction
    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }

    // update position: x = x0 + vt
    this.node.x += this.xSpeed * dt;
  },

  /**
   * setJumpAction
   * @return {ActionInterval}
   */
  setJumpAction: function setJumpAction() {
    // using cc.p to create a cc.Vec2 object which is represented 2D vectors and coordinates
    // cc.moveBy(duration<Number>, deltaPos<Vec2|Number>)
    // cc.sequence(actions) The actions are performed in sequence.
    var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
    var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
  },

  initKeyboardEvent: function initKeyboardEvent() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
      switch (event.keyCode) {
        case cc.KEY.left:
          this.leftAccelarate = true;
          break;
        case cc.KEY.right:
          this.rightAccelarate = true;
          break;
      }
    }, this);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
      switch (event.keyCode) {
        case cc.KEY.left:
          this.leftAccelarate = false;
          break;
        case cc.KEY.right:
          this.rightAccelarate = false;
          break;
      }
    }, this);
  }
});

cc._RF.pop();