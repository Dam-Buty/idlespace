
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

var upgrades = [{
  description: "Reactor upgrade (+20 max HP)",
  price: 5,
  time: 40,
  effect: function() {
    Game.ship.entity.maxHP += 20;
  }
}, {
  description: "Shield upgrade (+5 damage on impact)",
  price: 5,
  time: 40,
  effect: function() {
    Game.ship.entity.damage += 5;
  }
}, {
  description: "Thrusters upgrade (+50 speed)",
  price: 10,
  time: 60,
  effect: function() {
    Game.ship.systems.thrusters.speed += 50;
  }
}];

Game.go();
