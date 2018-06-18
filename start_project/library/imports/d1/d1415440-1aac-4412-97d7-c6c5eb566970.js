"use strict";
cc._RF.push(module, 'd1415RAGqxEEpfXxsXrVmlw', 'Star');
// scripts/Star.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {
    pickRadius: 0,
    game: {
      default: null,
      // Attributes that specify the default default value are serialized by default.
      // After serialization, the values set in the editor are saved to the scene and other resource files,
      // and the previously set values are automatically restored when the scene is loaded.
      // If you do not want to serialize, you can set serializable: false.
      serializable: false
    }
  },

  update: function update(dt) {
    if (this.getToPlayerDistance() < this.pickRadius) {
      this.onPicked();
    } else {
      var opacityRate = 1 - this.game.timer / this.game.starDuration;
      this.node.opacity = Math.floor(255 * opacityRate);
      if (this.node.opacity < 5) {
        this.node.destroy();
      }
    }
  },


  /**
   * @return {number} distance
   */
  getToPlayerDistance: function getToPlayerDistance() {
    return this.node.position.sub(this.game.player.getPosition()).mag();
    // return cc.pDistance(this.node.position, this.game.player.getPosition());
  },

  onPicked: function onPicked() {
    this.game.generateStar();
    this.game.gainScore();
    this.node.destroy();
  }
});

cc._RF.pop();