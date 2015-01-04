var Bullet = function(options) {
    return Entity({
      hp: 1,
      damage: options.damage,

      moving: true,
      direction: options.direction,
      speed: options.speed,
      warp: "die",

      team: options.team,
      kills: true,
      dies: true,

      sprite: Utils.getSprite("bullet"),
      top: Game.ship.entity.sprite.top + (Game.ship.entity.sprite.height / 2),
      left: Game.ship.entity.sprite.left + Game.ship.entity.sprite.width
    });
};
