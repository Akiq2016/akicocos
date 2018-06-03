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

  onLoad: function onLoad() {},
  start: function start() {},
  update: function update(dt) {}
});

cc._RF.pop();