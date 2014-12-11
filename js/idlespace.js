
var enemies = [{
    name: "Alice",
    hp: 10,
    scrap: [1, 3],
    population: 8,
    sectors: [-20, 10],
    attack: 10,
    defense: 5
}, {
    name: "Bob",
    hp: 18,
    scrap: [2, 4],
    population: 8,
    sectors: [-20, 10]
}, {
    name: "Dave",
    hp: 42,
    scrap: [5, 10],
    population: 4,
    sectors: [12, 25]
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
            var sprite = el.sprite;            
            return [ 
                [sprite.offsetLeft, sprite.offsetLeft + el.width], 
                [sprite.offsetTop, sprite.offsetTop + el.height] 
            ];
        }

        function comparePositions( p1, p2 ) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }
        
        var shot = [];        
        var elPos = getPositions(el);
        
        for(var i = 0;i < targets.length && (shot.length < max || targets.length);i++) {
            var targetPos = getPositions(targets[i]);
            
            if (comparePositions(elPos[0], targetPos[0]) && comparePositions(elPos[1], targetPos[1])) {
                shot.push(targets[i]);
            }
        }
        
        return shot;
    }
};

var Game = {
    sector: 0,
    handle: undefined,
    
    grid: {
        x: 100,
        y: 30
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
        
        gameSector: undefined
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
            }
        }
    },
    
    go: function() {
        this.spawner = Spawner();
        this.ship = Ship();
        
        // Init game Area
        this.gameArea.element = document.getElementById("game-area");
        this.gameArea.width = this.gameArea.element.offsetWidth;
        this.gameArea.height = this.gameArea.element.offsetHeight;
        
        // Init HUD
        this.hudArea.element = document.getElementById("hud-area");
        this.hudArea.gameSector = document.getElementById("game-sector");
        
        // Calculate grid
        this.chunk.x = this.gameArea.width / this.grid.x;
        this.chunk.y = this.gameArea.height / this.grid.y;
        
        // Spawn ship
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
    }
};

var Spawner = function() {
    return {
        enemies: enemies,
        minDelay: 100,
        maxDelay: 600,
        
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
    
    return {
        hp: 10,
        lives: 3,
        
        sprite: sprite.cloneNode(true),
        width: width,
        height: height,
        
        systems: {   
            thrusters: {
                speed: 2
            },
            
            autoRepair: {
                active: true,
                time: 2000,
                lives: 1
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
                    this.sprite.style.left = Math.max(0, this.sprite.offsetLeft - (Game.chunk.x * this.systems.thrusters.speed));
                    break;
                case "up":
                    this.sprite.style.top = Math.max(0, this.sprite.offsetTop - (Game.chunk.y * this.systems.thrusters.speed));
                    break;
                case "right":
                    this.sprite.style.left = Math.min(Game.gameArea.width - this.width, this.sprite.offsetLeft + (Game.chunk.x * this.systems.thrusters.speed));
                    break;
                case "down":
                    this.sprite.style.top = Math.min(Game.gameArea.height - this.height, this.sprite.offsetTop + (Game.chunk.y * this.systems.thrusters.speed));
                    break;
            }
        }
    };
};

var Enemy = function(enemy) {
    var sprite = Utils.sprite(enemy.name);
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;
    
    return {
        idx: undefined,
        
        name: enemy.name,
        maxHP: enemy.hp,
        hp: enemy.hp,
        
        scrap: Utils.distribution(enemy.scrap),
        delay: Utils.linear([Game.spawner.minDelay, Game.spawner.maxDelay]),
        
        sprite: sprite.cloneNode(true),
        width: width,
        height: height,
        
        handle: undefined,
        
        spawn: function() {
            this.sprite.style.top = Math.random() * (Game.gameArea.height - this.height);
            
            this.sprite.style.transitionDuration = this.delay;

            Game.gameArea.element.appendChild(this.sprite);
            
            this.move();
        },
        
        move: function() {
            var self = this;
            
            this.sprite.style.right = (Game.gameArea.width - this.sprite.offsetLeft - this.width) + Game.chunk.x;
            
            if (this.sprite.offsetLeft <= 0) {
                this.sprite.style.right = 0;
            }
            
            this.handle = setTimeout(function() {
                self.move();
            }, this.delay); 
        },
        
        shotAt: function() {
            this.hp = this.hp - Game.ship.systems.weapons.damage;
            
            this.sprite.getElementsByClassName("hp")[0].style.width = (this.hp * 100 / this.maxHP) + "%";
            
            if (this.hp <= 0) {
                this.die();
            }
        },
        
        die: function() {
            clearInterval(this.handle);
            this.handle = undefined;
            
            Game.gameArea.element.removeChild(this.sprite);
            
            Game.enemies.kill(this.idx);
        }
    };
};

var Bullet = function(options) {
    var sprite = Utils.sprite("bullet");
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;
    
    return {
        rate: 100,
        handle: undefined,        
        
        hostile: options.hostile,
        
        speed: options.speed,
        damage: options.damage,
        
        sprite: sprite.cloneNode(true),
        width: width,
        height: height,
        
        shoot: function() {
            var self = this;
            
            this.sprite.style.top = Game.ship.sprite.offsetTop + (Game.ship.height / 2);
            this.sprite.style.left = Game.ship.sprite.offsetLeft + Game.ship.width;
            
            Game.gameArea.element.appendChild(this.sprite);
            
            this.handle = setInterval(function() {
                self.move();
            }, this.rate);
        },
        
        move: function() {
            this.sprite.style.left = this.sprite.offsetLeft + (Game.chunk.x * this.speed);
            
            if (this.collision() || this.sprite.offsetLeft >= (Game.gameArea.width - this.width)) {
                this.die();
            }
        },
        
        collision: function() {
            var shot = Utils.collision(this, Game.enemies.live, 1);
            
            if (shot.length > 0) {
                shot[0].shotAt();
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

Game.go();
