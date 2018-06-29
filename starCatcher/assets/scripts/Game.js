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
    starProgress: {
      default: null,
      type: cc.ProgressBar
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
    },
    gameHint: {
      default: null,
      type: cc.Label
    },
    gameHintOnDesktop: {
      default: '',
      multiline: true
    },
    gameHintOnMobile: {
      default: '',
      multiline: true
    }
  },

  onLoad() {
    // Get the y-axis coordinate of the ground plane
    // (that base on the anchor is still on the center position as default)
    this.groundY = this.ground.y + this.ground.height / 2

    // init game component status
    this.enabled = false

    // set game hint for different device
    this.setGameHint()

    // initialize star pool
    this.starPool = new cc.NodePool('Star')
  },

  update(dt) {
    if (this.starPool.size() >= 1) {
      this.gameOver()

      // disable this to avoid gameOver() repeatedly
      this.enabled = false
    } else {
      this.timer += dt
      this.updateStarProgress()
    }
  },

  onEnable() {
    // initiate score
    this.score = 0

    // initiate star related
    this.generateStarProgress()
    this.setNewStarRelated()

    // initiate player
    this.player.active = true
    this.player.getComponent('Player').enabled = true
  },

  generateStarProgress() {
    this.starProgress.node.active = true
    this.starProgress.reverse = false
  },

  updateStarProgress() {
    this.starProgress.progress = (this.star.opacity - 5) / 250
  },

  setNewStarRelated() {
    this.generateStar()
    this.resetParamsThatDependOnStar()
  },

  generateStar() {
    // instantiate new nodes from Prefab
    this.star = this.starPool.size() >= 1
      ? this.starPool.get()
      : cc.instantiate(this.starPrefab)
    this.node.addChild(this.star)
    this.star.setPosition(this.getStarPosition())
    this.star.getComponent('Star').init(this)
  },

  resetParamsThatDependOnStar() {
    this.timer = 0
    this.starDuration = this.getStarDuration()
    this.starProgress.progress = 1
  },

  getStarDuration() {
    return this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration)
  },

  getStarPosition() {
    var Y = this.groundY + this.star.height / 2 + Math.random() * this.player.getComponent('Player').jumpHeight
    var X = (Math.random() - 0.5) * 2 * ((this.node.width - this.star.width) / 2)
    console.log(Y)
    return cc.v2(X, Y)
  },

  gainScore() {
    let str = this.scoreLabel.string
    this.score += 1
    this.scoreLabel.string = str.slice(0, str.indexOf(':') + 2) + this.score
    cc.audioEngine.play(this.scoreAudio, false)
  },

  setGameHint() {
    this.gameHint.string = cc.sys.isMobile
      ? this.gameHintOnMobile
      : this.gameHintOnDesktop
  },

  startGame() {
    this.enabled = true
    this.startBtn.active = false
  },

  gameOver() {
    GLOBAL.lastScore = this.score
    cc.director.loadScene('gameover')
  },
})
