var Ship = function() {
    return {
        lives: Pact(3, Game.hudArea.lives),
        scrap: Pact(0, Game.hudArea.scrap),

        entity: undefined,

        km: undefined,

        init: function() {
          var self = this;

          var options = {
            hp: Pact(30, Game.hudArea.hp),
            acceleration: 1000,
            team: 0,
            kills: true,
            dies: false,
            damage: 10,

            onLethal: function() {
              self.lives.minus(1);
              self.hp.set(30);
            },

            sprite: Utils.getSprite("ship"),
            top: Game.collider.area.height / 2,
            left: 0
          };

          this.entity = Entity(options);

          Game.collider.spawn(this.entity);

          this.km = Keymapper(this.systems.thrusters.activate).start();

          return this;
        },

        systems: {
            thrusters: {
                speed: 100,
                acceleration: 1000,
                activate: function(pressed) {
                  var direction = 0;

                  if (!pressed[37]
                    && !pressed[38]
                    && !pressed[39]
                    && !pressed[40]
                  ) {
                    Game.ship.entity.moving = false;
                  } else {
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

                    Game.ship.entity.speed = Game.ship.systems.thrusters.speed;
                    Game.ship.entity.moving = true;
                    Game.ship.entity.direction = direction;
                  }
                }
            },

            repair: {
                active: false,
                time: 2000,
                lives: 1
            },

            magnet: {
                radius: 50,
                force: 10
            },

            weapons: {
                active: false,
                delay: 4,
                bullets: 1,
                speed: 200,
                damage: 4,
                missiles: 0,

                start: function() {
                  var self = this;
                  this.active = true;

                  Game.riddim.plan(function() {
                    Game.collider.spawn(Bullet({
                      team: 0,
                      speed: self.speed,
                      damage: self.damage,
                      direction: 90
                    }));

                    return self.active;
                  }).every(this.delay);
                }
            }
        },

        addScrap: function(value) {
            this.scrap.plus(value);
        }
    };
};
