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
    },
    scoreAudio: {
      default: null,
      url: cc.AudioClip
    }
  },

  onLoad () {
    // Get the y-axis coordinate of the ground plane
    // (that base on the anchor is still on the center position as default)
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.generateStar();

    // init score
    this.score = 0;
  },

  update (dt) {
    if (this.timer > this.starDuration) {
      this.gameOver();
    } else {
      this.timer += dt;
    }
  },

  generateStar: function() {
    // instantiate new nodes from Prefab
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getStarPosition());
    newStar.getComponent('Star').game = this;

    this.starDuration = this.getStarDuration()
    this.timer = 0;
  },

  getStarDuration: function () {
    return this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
  },

  getStarPosition: function () {
    var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
    var randX = cc.randomMinus1To1() * (this.node.width / 2);

    return cc.p(randX, randY);
  },

  gainScore: function () {
    let str = this.scoreLabel.string
    this.score += 1;
    this.scoreLabel.string = str.slice(0, str.indexOf(':') + 2) + this.score;
    cc.audioEngine.playEffect(this.scoreAudio, false);
  },

  gameOver: function () {
    this.player.stopAllActions();
    cc.director.loadScene('game');
  },
});
