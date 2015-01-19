var Keymapper = function(callback) {
  return {
    pressed: {
      32: false, // space
      37: false, // left
      38: false, // up
      39: false, // right
      40: false  // down
    },

    calculateDirection: function(pressed) {
      var direction;
      if (pressed[37]) {
        if (pressed[38]) {
          direction = 315;
        } else {
          if (pressed[40]) {
            direction = 225;
          } else {
            direction = 270;
          }
        }
      } else {
        if (pressed[39]) {
          if (pressed[38]) {
            direction = 45;
          } else {
            if (pressed[40]) {
              direction = 135;
            } else {
              direction = 90;
            }
          }
        } else {
          if (pressed[38]) {
            direction = 0;
          } else {
            if (pressed[40]) {
              direction = 180
            }
          }
        }
      }

      return direction;
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

      return this;
    }
  }
};
