var Collider = function(area) {
  return {
    handle: undefined,

    area: {
      el: area || document.body,

      width: 0,
      height: 0,

      grid: {
        x: 100,
        y: 50
      },

      chunk: {
        x: 0,
        y: 0
      },

      init: function() {
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;

        this.chunk.x = this.width / this.grid.x;
        this.chunk.y = this.height / this.grid.y;
      }
    },

    teams: [],

    spawn: function(entity) {
      if (this.teams[entity.team] === undefined) {
        this.teams[entity.team] = [];
      }

      this.teams[entity.team].push(entity);

      if (entity.sprite.top == -1) {
        entity.sprite.top = Math.random() * (this.area.height - entity.sprite.height);
      }

      if (entity.sprite.left == -1) {
        entity.sprite.left = Math.random() * (this.area.width - entity.sprite.width);
      }

      this.area.el.appendChild(entity.sprite.el);

      entity.sprite.init();
    },

    stop: function() {
      window.cancelAnimationFrame(this.handle);
    },

    start: function() {
      this.area.init();
      this.lastTick = new Date();
      this.frame();

      return this;
    },

    frame: function() {
      console.time("frame");
      var self = this;

      this.handle = window.requestAnimationFrame(function() {
        self.frame();
      });

      var time = new Date();
      var delay = (time - this.lastTick) / 1000;

      // Everybody move!
      for(var i = 0;i < this.teams.length;i++) {
          var team = this.teams[i];
          for (var j = 0;j < team.length;j++) {
            var entity = team[j];
            if (!entity.dead && entity.moving) {
              if (entity.speed > 0) {
                entity.move(delay, this.area);
              }
            }
          }
      }

      // Everybody collide! *_* faire collider que ceux qui ont bougé?
      for(var i = 0;i < this.teams.length;i++) {
        var teamA = this.teams[i];
        for(var j = i+1;j < this.teams.length;j++) {
          var teamB = this.teams[j];
          this.collide(teamA, teamB);
        }
      }

      this.lastTick = time;

      console.timeEnd("frame");
    },

    collide: function(teamA, teamB) {
      function comparePositions( p1, p2 ) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
      }

      for (var i = 0;i < teamA.length;i++) {
        var a = teamA[i];
        var aPos = a.sprite.getPositions();
        for(var j = 0;j < teamB.length;j++) {
          var b = teamB[j];
          var bPos = b.sprite.getPositions();
          if (comparePositions(aPos[0], bPos[0]) && comparePositions(aPos[1], bPos[1])) {
            a.hit(b.damage * b.kills);
            b.hit(a.damage * a.kills);
          }
        }
      }
    }
  }
};
