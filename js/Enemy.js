var Enemy = function(enemy) {
    return {
        name: enemy.name,

        scrap: Utils.linear(enemy.scrap),

        entity: undefined,

        init: function(level) {
          var self = this;
          level = 1 + level/10;

          this.scrap *= level;

          var options = {
            hp: enemy.hp * level,

            moving: true,
            direction: 270,
            speed: Utils.linear(enemy.speed) * level,
            warp: enemy.warp,

            team: 1,
            kills: true,
            dies: true,
            suffers: true,

            deathDelay: 10,
            damage: enemy.damage * level,

            onWarp: function() {
              self.entity.hp.oBy(1.1).reset();
              self.entity.damage *= 1.05;
              self.entity.speed *= 1.02;
              self.scrap *= 1.5;
            },

            onLethal: function() {
              //self.sprite.element.removeChild(self.sprite.hud.hp);
              self.entity.sprite.el.classList.add("exploding");
              Game.riddim.plan(function() {
                Game.checkSector();
              }).in(5);

              var lootOptions = {
                scrap: self.scrap,

                direction: self.entity.direction,
                speed: self.entity.speed,

                width: self.entity.sprite.width,
                height: self.entity.sprite.height,
                top: self.entity.sprite.top,
                left: self.entity.sprite.left
              };

              Game.riddim.plan(function() {
                Game.loot(lootOptions);
              }).in(10);
            },

            sprite: Utils.getSprite(enemy.name),
            top: -1,
            left: Game.collider.area.width
          };

          this.entity = Entity(options);

          return this;
        }
    };
};
