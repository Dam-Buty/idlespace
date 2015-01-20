var Ship = function() {
    return {
        lives: Pact(3, Game.hudArea.lives),
        scrap: Pact(0, Game.hudArea.scrap),

        entity: undefined,

        init: function() {
          var self = this;

          var options = {
            hp: 30,
            team: 0,
            kills: true,
            dies: false,
            suffers: true,
            damage: 10,

            onLethal: function() {
              self.lives.minus(1);
              self.entity.hp.set(30);
            },

            sprite: Utils.getSprite("ship"),
            top: Game.collider.area.height / 2,
            left: 0
          };

          this.entity = Entity(options);

          Game.collider.spawn(this.entity);

          return this;
        },

        systems: {
          triage: function(pressed) {
            if (pressed[37]
              || pressed[38]
              || pressed[39]
              || pressed[40]
            ) {
              Game.ship.entity.speed = Game.ship.systems.navigation.speed;
              Game.ship.entity.direction = Game.km.calculateDirection(pressed);
              Game.ship.systems.navigation.start();
            } else {
              Game.ship.systems.navigation.stop();
            }

            if (pressed[32]) {
              Game.pause();
            }
          },

          navigation: {
            active: true,
            speed: 100,
            start: function() {
              if (this.active) {
                Game.ship.entity.moving = true;
              }
            },
            stop: function() {
              Game.ship.entity.moving = false;
            }
          },

          weapons: {
            active: false,
            rate: 6,
            bullets: 1,
            speed: 200,
            damage: 15,
            missiles: 0,

            tick: function() {
              var self = this;

              if (this.active) {
                Game.riddim.plan(function() {
                  Game.collider.spawn(Bullet({
                    team: 0,
                    speed: self.speed,
                    damage: self.damage,
                    direction: 90
                  }));
                  return self.active;
                }).every(this.rate);
              }
            },

            start: function() {
              if (!this.active) {
                this.active = true;
                this.tick();
              }
            },

            stop: function() {
              this.active = false;
            }
          },

          repair: {
              active: false,
              time: 18,
              hp: 1,
              ratio: 1,

              tick: function() {
                var self = this;

                if (Game.ship.scrap > this.hp / this.ratio) {
                  Game.ship.entity.hp.plus(this.hp).upTo();
                  Game.ship.scrap.minus(this.hp / this.ratio);
                }

                if (this.active) {
                  Game.riddim.plan(function() {
                    self.tick();
                  }).in(this.time);
                }
              },

              start: function() {
                this.active = true;
                this.tick();
              },

              stop: function() {
                this.active = false;
              }
          },

          magnet: {
              radius: 50,
              force: 10
          },

          extractor: {
            rate: 1
          }
        },

        addScrap: function(value) {
            this.scrap.plus(value);
        }
    };
};
