var Ship = function() {
    return {
        lives: 3,
        scrap: 0,

        entity: undefined,

        init: function() {
          var self = this;

          var options = {
            hp: 30,
            acceleration: 1000,
            team: 0,
            kills: true,
            dies: false,
            damage: 10,

            onLethal: function() {
              self.lives--;
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
            thrusters: {
                speed: 100,
                acceleration: 1000
            },

            shieldRepair: {
                time: 5,
                amount: 10
            },

            autoRepair: {
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

        repairShield: function() {
            var self = this;

            Game.riddim.plan(function() {
                if (self.shield < self.maxShield) {
                    self.shield = Math.min(self.maxShield, self.shield + self.systems.shieldRepair.amount);
                    self.sprite.hud.shield.style.width = (self.shield * 100 / self.maxShield) + "%";
                    return true;
                } else {
                    return false;
                }
            }).every(self.systems.shieldRepair.time);
        },

        addScrap: function(value) {
            this.scrap += value;
            Game.hudArea.scrap.innerHTML = this.scrap;
        }
    };
};
