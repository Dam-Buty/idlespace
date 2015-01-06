var Upgrade = function(options) {
  return {
    price: options.price,
    description: options.description,
    short: options.short,
    effect: options.effect,

    timer: options.time,

    entity: Entity({
      hp: 1,
      damage: 0,

      moving: true,
      direction: 270,
      speed: 50,
      warp: "die",

      team: 1,
      kills: false,
      dies: false,

      sprite: Utils.getSprite("upgrade"),
      top: -1,
      left: Game.collider.area.width
    }),

    init: function() {
      var self = this;

      var onCollide = function() {
        if (Game.ship.scrap >= self.price) {
          if (self.timer > 0) {
            self.timer.minus(1);
          } else {
              self.effect();
              Game.ship.scrap.minus(self.price);
            self.entity.dead = true;
          }
        }
      };

      var onLethal = function() {
        Game.upgrayedd.live.pop();
      };

      this.timer = Pact(this.timer, this.entity.sprite.el, "opacity", "/1");
      this.price = Pact(this.price, this.entity.sprite.el.getElementsByClassName("price")[0]);
      this.short = Pact(this.short, this.entity.sprite.el.getElementsByClassName("short")[0]);
      this.description = Pact(this.description, this.entity.sprite.el.getElementsByClassName("description")[0]);

      this.entity.onCollide = onCollide;
      this.entity.onLethal = onLethal;

      return this.entity;
    }
  };
};
