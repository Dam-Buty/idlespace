
var enemies = [{
    name: "Alice",
    hp: 10,
    scrap: [1, 3],
    population: 50,
    sectors: [-20, 30],
    damage: 5,
    warp: "warp",
    speed: [50, 150]
}, {
    name: "Bob",
    hp: 18,
    scrap: [2, 4],
    population: 24,
    sectors: [-20, 50],
    damage: 10,
    warp: "warp",
    speed: [100, 200]
}, {
    name: "Dave",
    hp: 42,
    scrap: [5, 10],
    population: 33,
    sectors: [-20, 80],
    damage: 20,
    warp: "warp",
    speed: [25, 50]
}];

var upgrades = {
  "Weapons": [{
    price: 1,
    short: "#SHOOT#"
    description: "Rain fire upon them, soldier",
    effect: function() {
      Game.ship.systems.weapons.start();
    }
  }, {
    price: [50, 200, 1666, 5000],
    stats: [7, 23, 160, 666],
    short: "{DMG+}",
    description: "Set phasers to HARDER",
    effect: function(stat) {
      Game.ship.systems.weapons.damage = stat;
    }
  }, {
    price: [100, 400],
    stats: [300, 600],
    short: "{SPD+}",
    description: "Those bullets don't kick MORE ass, they just kick it FASTER",
    effect: function(stat) {
      Game.ship.systems.weapons.speed = stat;
    }
  }, {
    price: [300, 900, 5000],
    stats: [3, 2, 1],
    short: "{RATE+}",
    description: "More bullets per second means more knuckles to their teeth",
    effect: function(stat) {
      Game.ship.systems.weapons.rate = stat;
    }
  }],
  "Shield": [{
    price: [5, 125],
    stats: [15, 150]
    short: "#SHIELD#",
    description: "Protects from flying debris, inflicts damage on impact",
    effect: function(stat) {
      Game.ship.entity.damage = stat;
    }
  }],
  "Repair": [{
    price: 50,
    short: "#RPR#",
    description: "Tiny scrap-made drones repair your hull with scrap. Or something deep like that.",
    effect: function() {
      Game.ship.systems.repair.start();
    }
  }]
};

var levels = [{
  level: 0,
  text: [
    "When i first woke up, everything was kind of hazy",
    "I didn't know where i was or how i could pilot this thing",
    "I didn't even know how to shoot the cannon so..."
  ]
}, {
  level: 1,
  text: [
    "When the first monster came",
    "I guess i just... panicked...",
    "I rammed into it headfirst, like it was going to make it disappear"
  ],
  enemies: [
    "Alice": 1
  ]
}, {
  level: 2,
  text: [
    "And it did! I mean, i was stupefied myself",
    "Damn shockwave nearly broke my leg too",
    "But it did, so i hesitated a bit, and rammed into a couple more"
  ],
  enemies: [
    "Alice": 2
  ]
}, {
  level: 3;
  text: [
    "Couldn't remember my orders, couldn't remember my CO's name",
    "Damn, i couldn't even remember my own name!",
    "But i sure as hell remembered what an upgrading station looks like"
  ],
  upgrades: [
    "Weapon": 1
  ]
}, {
  level: 4,
  text: [
    ""
  ]
}
];

Game.go();
