var Entity = function(options) {
  return {
    maxHp: options.hp || 0,
    hp: options.hp || 0,
    dead: false,

    moving: options.moving || false,
    direction: options.direction || 0,
    speed: options.speed || 0,                  // speed is nb of pixels by second
    acceleration: options.acceleration || 0,
    warp: options.warp || undefined,

    onWarp: options.onWarp || undefined,

    team: options.team || 0,
    kills: options.kills || false,
    dies: options.kills || false,

    onHit: options.onHit || undefined,
    onLethal: options.onLethal || undefined,

    sprite: {
      el: options.sprite,
      top: options.top || undefined,
      left: options.left || undefined,

      width: 0,
      height: 0,

      init: function() {
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
      },

      move: function(x, y, area, parent) {
        this.left += x;
        this.top += y;

        var warped = this.warp(area, parent);

        this.el.style.left = this.left;
        this.el.style.top = this.top;
      },

      warp: function(area, parent) {
        if (this.warp === undefined) {
          this.left = Math.max(0, this.left);
          this.left = Math.min(this.left, area.width - this.sprite.width);
          this.top = Math.max(0, this.top);
          this.top = Math.min(this.top, area.height - this.sprite.height);
        } else {
          switch(this.warp) {
            case "warp":
              if (this.left < 0 - this.sprite.width) {
                this.left = area.width;
                this.top = area.height - this.top;
              }
              if (this.left > area.width + this.sprite.width) {
                this.left = 0 - this.sprite.width;
                this.top = area.height - this.top;
              }
              if (this.top < 0 - this.sprite.height) {
                this.left = area.width - this.left;
                this.top = area.height;
              }
              if (this.top > area.height + this.sprite.height) {
                this.left = area.width - this.left;
                this.top = 0 - this.sprite.height;
              }
              break;
            case "die":
              if ( this.left < 0 || this.top < 0 || this.left > area.width || this.top > area.height) {
                parent.dead = true;
              }
              break;
          }
        }

        return {
          x: x,
          y: y
        };
      },

      getPositions: function() {
        return [
          [this.left, this.left + this.width],
          [this.top, this.top + this.height]
        ];
      }
    },

    hud: options.hud,

    // Calculates how many pixels the entity should move
    // based on angle
    move: function(time, area) {
      var x, y, warped;
      var angle = this.direction % 90;
      var adj = this.speed * Math.cos(angle);
      var opp = this.speed * Math.cos(90 - angle);

      if (this.direction < 90) {
        x = opp;
        y = -1 * adj;
      } else {
        if (this.direction < 180) {
          x = adj;
          y = opp;
        } else {
          if (this.direction < 270) {
            x = -1 * opp;
            y = adj;
          } else {
            x = -1 * adj;
            y = -1 * opp;
          }
        }
      }

      x *= time;
      y *= time;

      this.sprite.move(x, y, area, this);
    },

    hit: function(damage) {
      this.hp -= damage;

      this.onHit();

      if (this.hp <= 0) {
        if (this.dies) {
          this.dead = true;
        }
        if (this.onLethal !== undefined) {
          this.onLethal();
        }
      }
    }
  };
};
