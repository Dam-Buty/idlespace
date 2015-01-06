var Scrap = function(options) {
    var value = options.value;

    var onCollide = function() {
      this.sprite.el.innerHTML = value;
      Game.ship.addScrap(value);
      this.deathDelay = 5;
      this.dead = true;
    };

    return Entity({
      hp: 1,
      damage: 0,

      moving: true,
      direction: options.direction,
      speed: options.speed,
      warp: "die",

      team: 1,
      kills: false,
      dies: true,

      onCollide: onCollide,

      sprite: Utils.getSprite("scrap"),
      top: options.top,
      left: options.left
    });
};
