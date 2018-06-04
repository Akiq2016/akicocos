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

  onLoad () {},

  start () {
  },

  update (dt) {
    if (this.getPlayerDistance() < this.pickRadius) {
      this.onPicked();
    }
  },

  /**
   * @return {number} distance
   */
  getPlayerDistance: function () {
    var playerPosition = this.game.player.getPosition();
    return cc.pDistance(this.node.position, playerPosition);
  },

  onPicked: function() {
    this.game.generateStar();
    this.node.destroy();
  },
});