var Entity = function(options) {
  return {
    maxHp: options.hp || 0,
    hp: options.hp || 0,
    dead: false,

    direction: options.direction || 0,
    speed: options.speed || 1,
    acceleration: options.acceleration || 0,
    warp: options.warp || false,

    onWarp: options.onWarp || undefined,

    team: options.team || 0,
    kills: options.kills || false,
    dies: options.kills || false,

    onHit: options.onHit || undefined,
    onLethal: options.onLethal || undefined,

    sprite: {
      el: options.sprite,
      top: options.top || undefined,
      left: options.left || undefined,

      width: 0,
      height: 0
    },

    hud: options.hud
  };
};
