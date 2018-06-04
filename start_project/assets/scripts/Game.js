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

  onLoad () {
    // Get the y-axis coordinate of the ground plane
    // (that base on the anchor is still on the center position as default)
    this.groundY = this.ground.y + this.ground.height / 2;
    this.generateStar();
  },

  start () {
  },

  update (dt) {},

  generateStar: function() {
    // instantiate new nodes from Prefab
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getStarPosition());
    newStar.getComponent('Star').game = this;
  },

  getStarPosition: function () {
    var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
    var randX = cc.randomMinus1To1() * (this.node.width / 2);

    return cc.p(randX, randY);
  }
});
