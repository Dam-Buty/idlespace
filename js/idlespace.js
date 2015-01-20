
var enemies = [{
    name: "Alice",
    hp: 10,
    scrap: [2, 5],
    population: 8,
    sectors: [-4, 4],
    damage: 10,
    warp: "warp",
    speed: [50, 150]
}, {
    name: "Bob",
    hp: 18,
    scrap: [3, 8],
    population: 6,
    sectors: [3, 9],
    damage: 18,
    warp: "warp",
    speed: [100, 180]
}, {
  name: "Dave",
  hp: 42,
  scrap: [7, 15],
  population: 8,
  sectors: [5, 18],
  damage: 25,
  warp: "warp",
  speed: [35, 65]
}, {
  name: "Julia",
  hp: 500,
  scrap: [2000, 3000],
  population: 2,
  sectors: [10, 18],
  damage: 35,
  warp: "warp",
  speed: [5, 10]
}, {
  name: "Bob",
  hp: 18,
  scrap: [4, 10],
  population: 6,
  sectors: [9, 18],
  damage: 18,
  warp: "warp",
  speed: [100, 180]
}, {
  name: "Mark",
  hp: 140,
  scrap: [15, 20],
  population: 5,
  sectors: [11, 18],
  damage: 18,
  warp: "warp",
  speed: [90, 130]
}];

var systems = [{
  name: "Navigation",
  on: true,
  description: "Gives you access to the Navigation system. Your ship can't move without this.",
  circuits: [{
    name: "Engine",
    description: "Higher speed",
    baseStat: 100,
    stats: [135, 180, 250],
    effect: function(stat) {
      Game.ship.systems.navigation.speed = stat;
    }
  }]
}, {
  name: "Weapons",
  on: false,
  description: "Standard Issue Pulse Artillery",
  circuits: [{
    name: "Plasma core",
    description: "More volts = more damage",
    baseStat: 15,
    stats: [23, 50, 99, 166],
    effect: function(stat) {
      Game.ship.systems.weapons.damage = stat;
    }
  }, {
    name: "Vortex",
    description: "A finely tuned vortex emits faster pulses",
    baseStat: 200,
    stats: [300, 600, 800],
    effect: function(stat) {
      Game.ship.systems.weapons.speed = stat;
    }
  }, {
    name: "Nitrogen-cooled pulser",
    description: "A cooled pulser can shoot more times per second without burning the whole place down",
    baseStat: 6,
    stats: [4, 2, 1],
    effect: function(stat) {
      Game.ship.systems.weapons.rate = stat;
    }
  }]
}, {
  name: "Hull",
  description: "Essentially protects you from explosive decompression",
  on: false,
  circuits: [{
    name: "Force Shield",
    description: "Protects you from flying debris and inflicts damage upon impact",
    baseStat: 10,
    stats: [15, 25],
    effect: function(stat) {
      Game.ship.entity.damage = stat;
    }
  }, {
    name: "Scrap Extractor",
    description: "Makes usable scrap out of the debris of your fallen enemies",
    baseStat: 1,
    stats: [1.6, 6],
    effect: function(stat) {
      Game.ship.systems.extractor.rate = stat;
    }
  }]
}, {
  name: "Repair drones",
  description: "Those nanobots automatically patch you up while you fight. Beware, though, it will cost you some scrap.",
  on: false,
  circuits: [{
    name: "More nanobots",
    description: "Can heal more HP",
    baseStat: 1,
    stats: [2, 8, 20],
    effect: function(stat) {
      Game.ship.systems.repair.hp = stat;
    }
  }, {
    name: "Better nanobots",
    description: "Can heal faster",
    baseStat: 18,
    stats: [12, 5, 2],
    effect: function(stat) {
      Game.ship.systems.repair.hp = stat;
    }
  }, {
    name: "Smaller nanobots",
    description: "Can heal with less scrap",
    baseStat: 1,
    stats: [2, 3, 4],
    effect: function(stat) {
      Game.ship.systems.repair.ratio = stat;
    }
  }]
}];

// var levels = [{
//   level: 0,
//   text: [
//     "When i first woke up, everything was kind of hazy",
//     "I didn't know where i was or how i could pilot this thing",
//     "I didn't even know how to shoot the cannon so..."
//   ]
// }, {
//   level: 1,
//   text: [
//     "When the first monster came",
//     "I guess i just... panicked...",
//     "I rammed into it headfirst, like it was going to make it disappear"
//   ],
//   enemies: [
//     "Alice": 1
//   ]
// }, {
//   level: 2,
//   text: [
//     "And it did! I mean, i was stupefied myself",
//     "Damn shockwave nearly broke my leg too",
//     "But it did, so i hesitated a bit, and rammed into a couple more"
//   ],
//   enemies: [
//     "Alice": 2
//   ]
// }, {
//   level: 3;
//   text: [
//     "Couldn't remember my orders, couldn't remember my CO's name",
//     "Damn, i couldn't even remember my own name!",
//     "But i sure as hell remembered what an upgrading station looks like"
//   ],
//   upgrades: [
//     "Weapon": 1
//   ]
// }, {
//   level: 4,
//   text: [
//     ""
//   ]
// }
// ];

Game.go();
