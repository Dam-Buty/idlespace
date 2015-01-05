var Upgrade = function(options) {
  return {
    price: options.price,
    description: options.description,
    effect: options.effect,

    maxTimer: options.time,
    timer: options.time,

    entity: Entity({
      hp: 1,
      damage: 0,

      moving: true,
      direction: 270,
      speed: 75,
      warp: "die",

      team: 1,
      kills: false,
      dies: false,

      onHit: undefined,

      sprite: Utils.getSprite("upgrade"),
      top: -1,
      left: Game.collider.area.offsetWidth
    }),

    init: function() {
      var self = this;

      var onHit = function() {
        if (self.timer > 0) {
          self.timer--;
          self.entity.sprite.el.getElementsByClassName("hp")[0].style.width = (self.timer / self.maxTimer * 100) + "%";
        } else {
          self.effect();
          self.entity.dead = true;
        }
      };

      this.entity.onHit = onHit;

      return this.entity;
    }
  }

  return ;
}
