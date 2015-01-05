var Riddim = function(fps) {
  return {
    handle: undefined,

    fps: fps || 10,

    queue: [],

    start: function() {
      var self = this;
      handle = setInterval(function() {
        self.tick();
      }, 1000 / this.fps);

      return this;
    },

    tick: function() {
      var current = this.queue.shift();

      if (current !== undefined) {
        for(var i = 0;i < current.length;i++) {
          current[i]();
        }
      }
    },

    plan: function(fn) {
      var self = this;

      return {
          fn: fn,
          in: function(ticks) {
            if (self.queue[ticks] === undefined) {
              self.queue[ticks] = [];
            }
            self.queue[ticks].push(fn);
          },

          every: function(ticks) {
            var fn2 = function() {
              if (fn()) {
                self.plan(fn).every(ticks);
              }
            }
            if (self.queue[ticks] === undefined) {
              self.queue[ticks] = [];
            }
            self.queue[ticks].push(fn2);
          }
      }
    }
  };
};
