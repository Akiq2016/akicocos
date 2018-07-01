require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  GameOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "986acUAmpdC/ac9lEzRyn/3", "GameOver");
    "use strict";
    var GLOBAL = require("global");
    cc.Class({
      extends: cc.Component,
      properties: {
        scoreLabel: {
          default: null,
          type: cc.Label
        }
      },
      start: function start() {
        this.setScore(GLOBAL.lastScore);
      },
      setScore: function setScore(score) {
        var str = this.scoreLabel.string;
        this.scoreLabel.string = str.slice(0, str.indexOf(":") + 2) + score;
      },
      startGame: function startGame() {
        cc.director.loadScene("game", function() {
          cc.director.getScene().getChildByName("game").getComponent("Game").startGame();
        });
      }
    });
    cc._RF.pop();
  }, {
    global: "global"
  } ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "788bbSjQHxCSYhrtP1Vc2Jv", "Game");
    "use strict";
    var GLOBAL = require("global");
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
          default: "",
          multiline: true
        },
        gameHintOnMobile: {
          default: "",
          multiline: true
        }
      },
      onLoad: function onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.enabled = false;
        this.setGameHint();
        this.starPool = new cc.NodePool("Star");
      },
      update: function update(dt) {
        if (this.starPool.size() >= 1) {
          this.gameOver();
          this.enabled = false;
        } else {
          this.timer += dt;
          this.updateStarProgress();
        }
      },
      onEnable: function onEnable() {
        this.score = 0;
        this.generateStarProgress();
        this.setNewStarRelated();
        this.player.active = true;
        this.player.getComponent("Player").enabled = true;
      },
      generateStarProgress: function generateStarProgress() {
        this.starProgress.totalLength = this.starProgress.node.width;
        this.starProgress.node.active = true;
        this.starProgress.reverse = false;
      },
      updateStarProgress: function updateStarProgress() {
        this.starProgress.progress = (this.star.opacity - 5) / 250;
      },
      setNewStarRelated: function setNewStarRelated() {
        this.generateStar();
        this.resetParamsThatDependOnStar();
      },
      generateStar: function generateStar() {
        this.star = this.starPool.size() >= 1 ? this.starPool.get() : cc.instantiate(this.starPrefab);
        this.node.addChild(this.star);
        this.star.setPosition(this.getStarPosition());
        this.star.getComponent("Star").init(this);
      },
      resetParamsThatDependOnStar: function resetParamsThatDependOnStar() {
        this.timer = 0;
        this.starDuration = this.getStarDuration();
        this.starProgress.progress = 1;
      },
      getStarDuration: function getStarDuration() {
        return this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
      },
      getStarPosition: function getStarPosition() {
        var Y = this.groundY + this.star.height / 2 + Math.random() * this.player.getComponent("Player").jumpHeight;
        var X = 2 * (Math.random() - .5) * ((this.node.width - this.star.width) / 2);
        return cc.v2(X, Y);
      },
      gainScore: function gainScore() {
        var str = this.scoreLabel.string;
        this.score += 1;
        this.scoreLabel.string = str.slice(0, str.indexOf(":") + 2) + this.score;
        cc.audioEngine.play(this.scoreAudio, false);
      },
      setGameHint: function setGameHint() {
        this.gameHint.string = cc.sys.isMobile ? this.gameHintOnMobile : this.gameHintOnDesktop;
      },
      startGame: function startGame() {
        this.enabled = true;
        this.startBtn.active = false;
      },
      gameOver: function gameOver() {
        GLOBAL.lastScore = this.score;
        cc.director.loadScene("gameover");
      }
    });
    cc._RF.pop();
  }, {
    global: "global"
  } ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "055ad2u7IVAgbtoFXT4nUQT", "Player");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        deformDuration: 0,
        maxMoveSpeed: 0,
        acceleration: 0,
        jumpAudio: {
          default: null,
          type: cc.AudioClip
        },
        game: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.enabled = false;
        this.leftAccelarate = false;
        this.rightAccelarate = false;
        this.xSpeed = 0;
        this.maxMoveX = this.node.parent.width - this.node.width;
        this.initKeyboardEvent();
        this.initTouchEvent();
      },
      start: function start() {},
      onEnable: function onEnable() {
        this.node.setPosition(cc.v2(0, this.game.getComponent("Game").groundY));
        this.node.runAction(this.setJumpAction());
      },
      update: function update(dt) {
        this.leftAccelarate ? this.xSpeed -= this.acceleration * dt : this.rightAccelarate && (this.xSpeed += this.acceleration * dt);
        Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
        Math.abs(this.node.x + this.xSpeed * dt) < this.maxMoveX / 2 ? this.node.x += this.xSpeed * dt : this.xSpeed = 0;
      },
      setJumpAction: function setJumpAction() {
        var shrinkBall = cc.scaleTo(this.deformDuration, 1, .6);
        var restoreBall = cc.scaleTo(this.deformDuration, 1, 1);
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(function() {
          cc.audioEngine.play(this.jumpAudio, false);
        }, this);
        return cc.repeatForever(cc.sequence(shrinkBall, restoreBall, jumpUp, jumpDown, callback));
      },
      initKeyboardEvent: function initKeyboardEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
          switch (event.keyCode) {
           case cc.macro.KEY.left:
            this.leftAccelarate = true;
            break;

           case cc.macro.KEY.right:
            this.rightAccelarate = true;
          }
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event) {
          switch (event.keyCode) {
           case cc.macro.KEY.left:
            this.leftAccelarate = false;
            break;

           case cc.macro.KEY.right:
            this.rightAccelarate = false;
          }
        }, this);
      },
      initTouchEvent: function initTouchEvent() {
        var currentCanvas = cc.Canvas.instance.node;
        currentCanvas.on(cc.Node.EventType.TOUCH_START, function(event) {
          var TOUCH_LOCATION = event.getLocation();
          if (TOUCH_LOCATION.x > cc.winSize.width / 2) {
            this.leftAccelarate = false;
            this.rightAccelarate = true;
          } else {
            this.leftAccelarate = true;
            this.rightAccelarate = false;
          }
        }, this);
        currentCanvas.on(cc.Node.EventType.TOUCH_END, function(event) {
          this.leftAccelarate = false;
          this.rightAccelarate = false;
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  Star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1415RAGqxEEpfXxsXrVmlw", "Star");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        pickRadius: 0,
        game: {
          default: null,
          serializable: false
        }
      },
      onLoad: function onLoad() {
        this.enable = false;
      },
      init: function init(game) {
        this.game = game;
        this.enable = true;
        this.node.opacity = 255;
      },
      update: function update(dt) {
        if (this.getToPlayerDistance() < this.pickRadius) this.onPicked(); else {
          var opacityRate = 1 - this.game.timer / this.game.starDuration;
          this.node.opacity = Math.floor(255 * opacityRate);
          this.node.opacity < 5 && this.game.starPool.put(this.node);
        }
      },
      getToPlayerDistance: function getToPlayerDistance() {
        return this.node.position.sub(this.game.player.position).mag();
      },
      onPicked: function onPicked() {
        this.game.gainScore();
        this.game.starPool.put(this.node);
        this.game.setNewStarRelated();
      }
    });
    cc._RF.pop();
  }, {} ],
  global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bf96gX4zZPMIn/zwZQ8m1m", "global");
    "use strict";
    module.exports = {
      lastScore: 0
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "Game", "GameOver", "Player", "Star", "global" ]);
//# sourceMappingURL=project.dev.js.map