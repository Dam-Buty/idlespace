var Enemy = function(enemy) {
    return {
        name: enemy.name,

        scrap: Utils.linear(enemy.scrap),

        entity: undefined,

        init: function() {
          var self = this;

          var options = {
            hp: enemy.hp,

            moving: true,
            direction: 270,
            speed: Utils.linear(enemy.speed),
            acceleration: 1000,
            warp: enemy.warp,

            team: 1,
            kills: true,
            dies: true,
            damage: enemy.damage,

            onLethal: function() {
              //self.sprite.element.removeChild(self.sprite.hud.hp);
              self.entity.sprite.el.classList.add("exploding");
              Game.checkSector();

              var scrapOptions = {
                scrap: self.scrap,

                direction: self.entity.direction,
                speed: self.entity.speed,

                width: self.entity.sprite.width,
                height: self.entity.sprite.height,
                top: self.entity.sprite.top,
                left: self.entity.sprite.left
              };

              Game.riddim.plan(function() {
                Game.scrap(scrapOptions);
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
