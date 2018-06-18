const GLOBAL = require('global')

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
    startBtn: {
      default: null,
      type: cc.Node
    },
    scoreLabel: {
      default: null,
      type: cc.Label
    },
    scoreAudio: {
      default: null,
      type: cc.AudioClip
    }
  },

  onLoad () {
    // Get the y-axis coordinate of the ground plane
    // (that base on the anchor is still on the center position as default)
    this.groundY = this.ground.y + this.ground.height / 2;

    // init game status
    this.enabled = false
  },

  update (dt) {
    if (!cc.isValid(this.star)) {
      this.gameOver();
    } else {
      this.timer += dt;
    }
  },

  onEnable () {
    this.timer = 0;
    this.starDuration = 0;
    this.score = 0;
    this.generateStar();

    // player
    this.player.getComponent('Player').enabled = true
  },

  generateStar: function() {
    // instantiate new nodes from Prefab
    this.star = cc.instantiate(this.starPrefab);
    this.node.addChild(this.star);
    this.star.setPosition(this.getStarPosition());
    this.star.getComponent('Star').game = this;

    this.starDuration = this.getStarDuration()
    this.timer = 0;
  },

  getStarDuration: function () {
    return this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
  },

  getStarPosition: function () {
    var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight;
    var randX = (Math.random() - 0.5) * 2 * (this.node.width / 2);

    return cc.v2(randX, randY);
  },

  gainScore: function () {
    let str = this.scoreLabel.string
    this.score += 1;
    this.scoreLabel.string = str.slice(0, str.indexOf(':') + 2) + this.score;
    cc.audioEngine.play(this.scoreAudio, false);
  },

  startGame: function () {
    this.enabled = true;
    this.startBtn.destroy();
  },

  gameOver: function () {
    this.enabled = false;
    GLOBAL.lastScore = this.score;
    cc.director.loadScene('gameover');
  },
});
