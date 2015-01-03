var Enemy = function(enemy) {
    var sprite = Sprite({
        id: enemy.name,

        top: -1,
        left: Game.gameArea.width,

        ticks: Utils.linear([Game.spawner.minDelay, Game.spawner.maxDelay]),
        speed: enemy.speed,
        warp: enemy.warp,

        hud: ["hp"]
    });

    return {
        idx: undefined,

        name: enemy.name,
        maxHP: enemy.hp,
        hp: enemy.hp,
        shield: enemy.shield,

        scrap: Utils.linear(enemy.scrap),

        exploding: false,

        sprite: sprite,

        spawn: function() {
            this.sprite.element.style.transitionDuration = this.delay * 100;

            this.move();
        },

        move: function() {
          var self = this;
          Game.riddim.plan(function() {
            if (!self.exploding) {
              self.sprite.move("left");

              return !self.collision();
            } else {
              return false;
            }
          }).every(this.delay);

        },

        collision: function() {
            var hit = this.sprite.collision([Game.ship], 1);

            if (hit.length > 0) {
                hit[0].hit(this.shield);
                return this.hit(hit[0].shield);
            }

            return false;
        },

        hit: function(damage) {
            if (!this.exploding) {
                this.hp = this.hp - damage;

                if (this.hp <= 0) {
                    this.die();
                    return false;
                } else {
                    this.sprite.hud.hp.style.width = (this.hp * 100 / this.maxHP) + "%";
                }

                return true;
            }
        },

        die: function() {
            var self = this;

            this.exploding = true;

            this.sprite.element.removeChild(this.sprite.hud.hp);
            this.sprite.element.classList.add("exploding");

            Game.riddim.plan(function() {
                Game.scrap(self.scrap, self.delay, {
                    width: self.sprite.width,
                    height: self.sprite.height,
                    top: self.sprite.top,
                    left: self.sprite.left
                });

                Game.gameArea.element.removeChild(self.sprite.element);

                Game.enemies.kill(self.idx);
            }).in(10);
        }
    };
};
