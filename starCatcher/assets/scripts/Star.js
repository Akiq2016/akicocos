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

  update (dt) {
    const test = this.getToPlayerDistance()
    console.log(test, this.pickRadius)
    if (test < this.pickRadius) {
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
  getToPlayerDistance: function () {
    // console.log(this.node.position, this.node.getPosition(), this.game.player.position, this.game.player.getPosition())
    return this.node.position.sub(this.game.player.position).mag()
  },

  onPicked: function() {
    this.game.setNewStarRelated();
    this.game.gainScore();
    this.node.destroy();
  },
});
