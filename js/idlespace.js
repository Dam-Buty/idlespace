
var enemies = [{
    name: "Alice",
    hp: 10,
    scrap: [1, 3],
    population: 25,
    sectors: [-20, 30],
    shield: 5
}, {
    name: "Bob",
    hp: 18,
    scrap: [2, 4],
    population: 8,
    sectors: [-20, 50],
    shield: 10
}, {
    name: "Dave",
    hp: 42,
    scrap: [5, 10],
    population: 4,
    sectors: [-20, 80],
    shield: 20
}];

var Utils = {
/*
               1       (-x² / 2)
  b + ( B * ( ---  *  e          ) )
                          √2π
*/
    distribution: function(boundaries, x) {
        if (x === undefined) {
            x = Math.random();
        }
        
        return (
            boundaries[0] + Math.floor(
                boundaries[1] * (
                    ( 1 / Math.sqrt(2 * Math.PI)) * (
                        Math.exp((-1 * x) / 2)
                    )
                )
            )
        );
    },
    
    linear: function(boundaries) {
        return (boundaries[0] + (Math.random() * (boundaries[1] - boundaries[0])));
    },
    
    shuffleArray: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    
    sprite: function(name) {
        return document.getElementById("sprites").getElementsByClassName(name)[0];
    },
    
    keyMap: function() {
        document.onkeydown = function (e) {
            e = e || window.event;
            // use e.keyCode
            
//            console.log(e.keyCode);
            
            switch(e.keyCode) {
                case 32:
                    if (Game.ship.systems.weapons.handle === undefined) {
                        Game.ship.systems.weapons.start();
                    }
                    break;
                case 37:
                    Game.ship.move("left");
                    break;
                case 38:
                    Game.ship.move("up");
                    break;
                case 39:
                    Game.ship.move("right");
                    break;
                case 40:
                    Game.ship.move("down");
                    break;
            }
        };
        
        document.onkeyup = function (e) {
            e = e || window.event;
            // use e.keyCode
            
//            console.log(e.keyCode);
            
            switch(e.keyCode) {
                case 32:
                    Game.ship.systems.weapons.stop();
                    break;
            }
        }
    },
    
    collision: function(el, targets, max) {
        function getPositions(el) {          
            return [ 
                [el.left, el.left + el.width], 
                [el.top, el.top + el.height] 
            ];
        }

        function comparePositions( p1, p2 ) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }
        
        var collisions = [];        
        var elPos = getPositions(el);
        
        for(var i = 0;i < targets.length && (collisions.length < (max || targets.length));i++) {
            var targetPos = getPositions(targets[i]);
            
            if (comparePositions(elPos[0], targetPos[0]) && comparePositions(elPos[1], targetPos[1])) {
                collisions.push(targets[i]);
            }
        }
        
        return collisions;
    }
};

var Game = {
    sector: 0,
    handle: undefined,
    
    grid: {
        x: 100,
        y: 50
    },
    chunk: {
        x: 0,
        y: 0
    },
    
    spawner: undefined,
    ship: undefined,
    
    gameArea: {
        element: undefined,
        width: 0,
        height: 0
    },
    
    hudArea: {
        element: undefined,
        gameSector: undefined,
        scrap: undefined
    },
    
    enemies: {
        live: [],
        queue: [],
        handle: undefined,
        
        spawn: function() {
            if (this.queue.length > 0) {
                var spawning = this.queue.shift();
                var idx = this.live.length;
                var self = this;
                
                spawning.idx = idx;
                
                this.live.push(spawning);
                
                spawning.spawn();
                
                if (this.queue.length > 0) {
                    this.handle = setTimeout(function() {
                        self.spawn();
                    }, spawning.delay);
                }
            } else {
                Game.nextSector();
            }
        },
        
        kill: function(idx) {
            this.live.splice(idx, 1);
            if (this.live.length == 0) {
                Game.nextSector();
            } else {
                this.reorder();
            }
        },
        
        reorder: function() {
            for(var i = 0;i < this.live.length;i++) {
                this.live[i].idx = i;
            }
        }
    },
    
    go: function() {        
        // Init game Area
        this.gameArea.element = document.getElementById("game-area");
        this.gameArea.width = this.gameArea.element.offsetWidth;
        this.gameArea.height = this.gameArea.element.offsetHeight;
        
        // Init HUD
        this.hudArea.element = document.getElementById("hud-area");
        this.hudArea.gameSector = document.getElementById("game-sector");
        this.hudArea.shipLives = document.getElementById("ship-lives");
        this.hudArea.scrap = document.getElementById("ship-scrap");
        
        // Calculate grid
        this.chunk.x = this.gameArea.width / this.grid.x;
        this.chunk.y = this.gameArea.height / this.grid.y;
        
        // Init spawner and ship
        this.spawner = Spawner();
        this.ship = Ship();
        this.gameArea.element.appendChild(this.ship.sprite);
        
        // Map keyboard
        Utils.keyMap();
        
        this.nextSector();
    },
    
    nextSector: function() {
        this.sector++;
        this.spawner.populateSector();
        this.enemies.spawn();
        
        this.hudArea.gameSector.innerHTML = this.sector;
    },
    
    scrap: function(scrap, delay, coords) {
        var values = [1000, 500, 100, 50, 10, 5, 1];
        for (;scrap > 0;) {
            for(var i = 0;i < values.length;i++) {
                var value = values[i];
                var top = coords.top + (Math.random() * coords.height);
                var left = coords.left + (Math.random() * coords.width);
            
                if (scrap >= value) {
                    Scrap({
                        top: top,
                        left: left,
                        delay: delay,
                        value: value
                    });
                    scrap -= value;
                    break;
                }
            }
        }
    }
};

var Spawner = function() {
    return {
        enemies: enemies,
        minDelay: 100,
        maxDelay: 300,
        
        isEligible: function(enemy) {
            return (enemy.sectors[0] <= Game.sector && Game.sector <= enemy.sectors[1]);
        },

        populateEnemy: function(enemy) {
            var score = Math.random();
            var population = 0;
            var spawned = [];
            
            if (score <= ((Game.sector - enemy.sectors[0]) / (enemy.sectors[1] - enemy.sectors[0]))) {
                population = Utils.distribution([1, enemy.population], score);
            }
            
            for(var i = 0;i < population;i++) {
                spawned.push(Enemy(enemy));
            }
            
            return spawned;         
        },
 
        populateSector: function() {
            var eligible = this.enemies.filter(this.isEligible, this);
            var spawned = [];
            
            for(var i = 0;i < eligible.length;i++) {
                spawned = spawned.concat(
                    this.populateEnemy(eligible[i])
                );
            }
            
            spawned = Utils.shuffleArray(spawned);
            
            Game.enemies.queue = Game.enemies.queue.concat(spawned);
        }
    };
};

var Ship = function() {
    var sprite = Utils.sprite("ship");
    
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;
    var top = Game.gameArea.height / 2;
    var left = 0;
    
    var clone = sprite.cloneNode(true);
    var hudHp = clone.getElementsByClassName("hp")[0];
    var hudShield = clone.getElementsByClassName("shield")[0];
    
    return {
        lives: 3,
        hp: 30,
        shield: 20,
        maxHP: 30,
        maxShield: 30,
        scrap: 0,
        
        sprite: clone,
        width: width,
        height: height,
        top: top,
        left: left,
        
        hud: {
            hp: hudHp,
            shield: hudShield
        },
        
        systems: {   
            thrusters: {
                speed: 2
            },
            
            shieldRepair: {
                time: 500,
                amount: 10
            },
            
            autoRepair: {
                active: false,
                time: 2000,
                lives: 1
            },
            
            magnet: {
                radius: 50,
                force: 10
            },
            
            weapons: {
                active: false,
                rate: 400,
                bullets: 1,
                speed: 0.5,
                damage: 4,
                missiles: 0,
                
                handle: undefined,
                
                start: function() {
                    var self = this;
                    
                    this.handle = setInterval(function() {
                        Bullet({
                            hostile: false,
                            speed: self.speed,
                            damage: self.damage
                        });
                    }, this.rate);
                },
                
                stop: function() {
                    clearInterval(this.handle);
                    this.handle = undefined;
                }
            } 
        },
        
        move: function(direction) {
            switch(direction) {
                case "left":
                    this.left = Math.max(0, this.left - (Game.chunk.x * this.systems.thrusters.speed));
                    break;
                case "up":
                    this.top = Math.max(0, this.top - (Game.chunk.y * this.systems.thrusters.speed));
                    break;
                case "right":
                    this.left = Math.min(Game.gameArea.width - this.width, this.left + (Game.chunk.x * this.systems.thrusters.speed));
                    break;
                case "down":
                    this.top = Math.min(Game.gameArea.height - this.height, this.top + (Game.chunk.y * this.systems.thrusters.speed));
                    break;
            }
            
            this.sprite.style.top = this.top;
            this.sprite.style.left = this.left;
        },
        
        hit: function(damage) {
            this.hp -= damage;
            this.shield = Math.max(0, this.shield - damage);
            
            if (this.hp <= 0) {
                this.die();
            }
            
            this.hud.hp.style.width = (this.hp * 100 / this.maxHP) + "%";
            this.hud.shield.style.width = (this.shield * 100 / this.maxShield) + "%";
            
            this.repairShield();
        },
        
        die: function() {
            this.lives--;
            this.hp = this.maxHP;
            this.shield = this.maxShield;
            Game.hudArea.shipLives.innerHTML = this.lives;
        },
        
        repairShield: function() {
            var self = this;
            
            setTimeout(function() {
                if (self.shield < self.maxShield) {
                    self.shield = Math.min(self.maxShield, self.shield + self.systems.shieldRepair.amount);
                    self.hud.shield.style.width = (self.shield * 100 / self.maxShield) + "%";
                }
            }, self.systems.shieldRepair.time);
        },
        
        addScrap: function(value) {
            this.scrap += value;
            Game.hudArea.scrap.innerHTML = this.scrap;
        }
    };
};

var Enemy = function(enemy) {
    var sprite = Utils.sprite(enemy.name);
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;
    var top = 0;
    var left = Game.gameArea.width;
    
    var clone = sprite.cloneNode(true);
    var hudHp = clone.getElementsByClassName("hp")[0];
    
    return {
        idx: undefined,
        handle: undefined,
        
        name: enemy.name,
        maxHP: enemy.hp,
        hp: enemy.hp,
        shield: enemy.shield,
        
        scrap: Utils.distribution(enemy.scrap),
        delay: Utils.linear([Game.spawner.minDelay, Game.spawner.maxDelay]),
        
        sprite: clone,
        width: width,
        height: height,
        top: top,
        left: left,
        
        hud: {
            hp: hudHp
        },
                
        handle: undefined,
        
        spawn: function() {
            this.top = Math.random() * (Game.gameArea.height - this.height);
            this.sprite.style.top = this.top;
            
            this.sprite.style.transitionDuration = this.delay;

            Game.gameArea.element.appendChild(this.sprite);
            
            this.move();
        },
        
        move: function() {
            if (!this.sprite.classList.contains("exploding")) {
                var self = this;
                
                this.left -= Game.chunk.x;
                
                if (this.left < 0) {
                    this.warp();
                }
                
                this.sprite.style.left = this.left;
                
                this.collision();
                
                this.handle = setTimeout(function() {
                    self.move();
                }, this.delay); 
            }
        },
        
        warp: function() {
            var self = this;
            
            this.left = Game.gameArea.width;
            this.sprite.style.transitionDuration = 0;
            this.sprite.style.left = this.left;
            
            setTimeout(function() {
                self.sprite.style.transitionDuration = self.delay;
            }, self.delay);
        },
        
        collision: function() {
            var hit = Utils.collision(this, [Game.ship], 1);
            
            if (hit.length > 0) {
                hit[0].hit(this.shield);
                this.hit(hit[0].shield);
            }
        },
        
        hit: function(damage) {
            this.hp = this.hp - damage;
            
            if (this.hp <= 0) {
                this.die();
            } else {
                this.hud.hp.style.width = (this.hp * 100 / this.maxHP) + "%";
            }
            
        },
        
        die: function() {
            var self = this;
            
            clearInterval(this.handle);
            this.handle = undefined;
            
            this.sprite.removeChild(this.hud.hp);
            this.sprite.classList.add("exploding");
            
            setTimeout(function() {
                Game.scrap(self.scrap, self.delay, {
                    width: self.width,
                    height: self.height,
                    top: self.top,
                    left: self.left
                });
                
                Game.gameArea.element.removeChild(self.sprite);
                
                Game.enemies.kill(self.idx);
            }, 1000);
        }
    };
};

var Bullet = function(options) {
    var sprite = Utils.sprite("bullet");
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;
    var top = Game.ship.top + (Game.ship.height / 2);
    var left = Game.ship.left + Game.ship.width;
    
    return {
        delay: 100,
        handle: undefined,        
        
        hostile: options.hostile,
        
        speed: options.speed,
        damage: options.damage,
        
        sprite: sprite.cloneNode(true),
        width: width,
        height: height,
        top: top,
        left: left,
        
        shoot: function() {
            var self = this;
            
            this.sprite.style.top = this.top;
            this.sprite.style.left = this.left;
            
            Game.gameArea.element.appendChild(this.sprite);
            
            this.handle = setInterval(function() {
                self.move();
            }, this.delay);
        },
        
        move: function() {
            this.left = this.left + (Game.chunk.x * this.speed);
            this.sprite.style.left = this.left;
            
            if (this.collision() || this.left >= (Game.gameArea.width - this.width)) {
                this.die();
            }
        },
        
        collision: function() {
            var shot = Utils.collision(this, Game.enemies.live, 1);
            
            if (shot.length > 0) {
                shot[0].hit(this.damage);
                return true;
            }
            
            return false;
        },
        
        die: function() {
            clearInterval(this.handle);
            this.handle = undefined;
            Game.gameArea.element.removeChild(this.sprite);
        }
    }.shoot();
};

var Scrap = function(scrap) {
    var sprite = Utils.sprite("scrap");
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;
    
    return {
        handle: undefined,
        delay: scrap.delay,
        
        value: scrap.value,
        
        sprite: sprite.cloneNode(true),
        top: scrap.top,
        left: scrap.left,
        width: width,
        height: height,
        
        shoot: function() {
            var self = this;
            
            this.sprite.style.top = this.top;
            this.sprite.style.left = this.left;
            
            Game.gameArea.element.appendChild(this.sprite);
            
            this.handle = setInterval(function() {
                self.move();
            }, this.delay);
        },
        
        move: function() {
            this.left = this.left - Game.chunk.x;
            this.sprite.style.left = this.left;
            
            if (this.collision() || this.left >= (Game.gameArea.width - this.width)) {
                this.die();
            }
        },
        
        collision: function() {
            var ship = Utils.collision(this, [Game.ship], 1)[0];
            
            if (ship !== undefined) {
                ship.addScrap(this.value);
                return true;
            }
            
            return false;
        },
        
        die: function() {
            var self = this;
            
            clearInterval(this.handle);
            this.handle = undefined;
            this.sprite.innerHTML = this.value;
            this.sprite.classList.add("scrapping");
            
            setTimeout(function() {
                Game.gameArea.element.removeChild(self.sprite);
            }, 500);
        }
    }.shoot();
};


Game.go();
