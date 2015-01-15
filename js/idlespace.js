
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

var upgrades = [{                                     // WEAPONS
  price: 1,
  short: "#SHOOT#",
  description: "Rain fire upon them, soldier",
  effect: function() {
    Game.ship.systems.weapons.start();
  }
}, {
  price: [50, 200, 1666, 5000],
  stats: [23, 50, 99, 166],
  short: "#DMG+#",
  description: "Set phasers to HARDER",
  effect: function(stat) {
    Game.ship.systems.weapons.damage = stat;
  }
}, {
  price: [70, 350, 1500],
  stats: [300, 600, 800],
  short: "#FSTR#",
  description: "Those bullets don't kick MORE ass, they just kick it FASTER",
  effect: function(stat) {
    Game.ship.systems.weapons.speed = stat;
  }
}, {
  price: [300, 900, 5000, 15000, 25000],
  stats: [5, 4, 3, 2, 1],
  short: "#RATE+#",
  description: "More bullets per second means more knuckles to their teeth",
  effect: function(stat) {
    Game.ship.systems.weapons.rate = stat;
  }
},
{                                                         // SHIELD
  price: [5, 125],
  stats: [15, 150],
  short: "{SHIELD}",
  description: "Better protection and higher damage on impact",
  effect: function(stat) {
    Game.ship.entity.damage = stat;
  }
},
{                                                       //REPAIR
  price: 35,
  short: "-RPR-",
  description: "A cloud of repair nano-drones takes care of you while you fight",
  effect: function() {
    Game.ship.systems.repair.start();
  }
},
{                                                   // THRUSTERS
  price: [100, 500, 1666, 3456],
  stats: [15, 35, 70, 150],
  short: "~SPD+~",
  description: "More speed to get out of dodge",
  effect: function(stat) {
    Game.ship.systems.thrusters.speed += stat;
  }
},
{                                                   // REACTOR
  price: [120, 360, 450, 999],
  stats: [15, 35, 70, 150],
  short: "¤HP+¤",
  description: "Add a compact layer of nano-drones to your hull so you can take more pounding",
  effect: function(stat) {
    Game.ship.entity.hp.oPlus(stat).reset();
  }
},
{                                                   // EXTRACTOR
  price: [200, 20000],
  stats: [1.6, 6],
  short: "-$$$-",
  description: "A better extractor will mine more scrap from the debris of your fallen enemies",
  effect: function(stat) {
    Game.ship.systems.extractor.rate = stat;
  }
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
