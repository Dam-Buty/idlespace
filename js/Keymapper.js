var Keymapper = function(callback) {
  return {
    pressed: {
      32: false, // space
      37: false, // left
      38: false, // up
      39: false, // right
      40: false  // down
    },

    down: function(e) {
      e = e || window.event;

      if (e.keyCode in this.pressed) {
          this.pressed[e.keyCode] = true;
      }

      callback(this.pressed);
    },

    up: function(e) {
      e = e || window.event;

      if (e.keyCode in this.pressed) {
        this.pressed[e.keyCode] = false;
      }

      callback(this.pressed);
    },

    start: function() {
      var self = this;

      document.onkeydown = function(e) {
        self.down(e);
      }

      document.onkeyup = function(e) {
        self.up(e);
      }
    }
  }
};
