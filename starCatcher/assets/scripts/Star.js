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

  onLoad() {
    this.enable = false
  },

  init(game) {
    this.game = game
    this.enable = true
    this.node.opacity = 255
  },

  update(dt) {
    if (this.getToPlayerDistance() < this.pickRadius) {
      this.onPicked()
    } else {
      var opacityRate = 1 - this.game.timer / this.game.starDuration
      this.node.opacity = Math.floor(255 * opacityRate)
      if (this.node.opacity < 5) {
        this.game.starPool.put(this.node)
      }
    }
  },

  /**
   * @return {number} distance
   */
  getToPlayerDistance: function () {
    return this.node.position.sub(this.game.player.position).mag()
  },

  onPicked: function() {
    this.game.gainScore()
    this.game.starPool.put(this.node)
    this.game.setNewStarRelated()
  },
});
