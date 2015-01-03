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
              self.sprite.el.classList.add("exploding");

              // Game.riddim.plan(function() {
              //   Game.scrap(self.scrap, self.delay, {
              //     width: self.sprite.width,
              //     height: self.sprite.height,
              //     top: self.sprite.top,
              //     left: self.sprite.left
              //   });
              //
              //   Game.gameArea.element.removeChild(self.sprite.element);
              //
              //   Game.enemies.kill(self.idx);
              // }).in(10);
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
