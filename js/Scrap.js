var Scrap = function(options) {
    var value = options.value;

    var onLethal = function() {
      this.sprite.el.innerHTML = value;
      Game.ship.addScrap(value);
    };

    var onHit = function() {
      this.deathDelay = 5;
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

      onLethal: onLethal,
      onHit: onHit,

      sprite: Utils.getSprite("scrap"),
      top: options.top,
      left: options.left
    });
};
