var Ship = function() {
    var sprite = Sprite({
        id: "ship",
        
        top: Game.gameArea.height / 2,
        left: 0,
        
        speed: 2,
        
        hud: ["hp", "shield"]
    });
    
    return {
        lives: 3,
        hp: 30,
        shield: 20,
        maxHP: 30,
        maxShield: 30,
        scrap: 0,
        
        sprite: sprite,
        
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
                rate: 1000,
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
                            damage: self.damage,
                            direction: "right"
                        }).move();
                    }, this.rate);
                },
                
                stop: function() {
                    clearInterval(this.handle);
                    this.handle = undefined;
                }
            } 
        },
        
        move: function(direction) {
            this.sprite.move(direction);
        },
        
        hit: function(damage) {
            this.hp -= damage;
            this.shield = Math.max(0, this.shield - damage);
            
            if (this.hp <= 0) {
                this.die();
            }
            
            this.sprite.hud.hp.style.width = (this.hp * 100 / this.maxHP) + "%";
            this.sprite.hud.shield.style.width = (this.shield * 100 / this.maxShield) + "%";
            
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
                    self.sprite.hud.shield.style.width = (self.shield * 100 / self.maxShield) + "%";
                }
            }, self.systems.shieldRepair.time);
        },
        
        addScrap: function(value) {
            this.scrap += value;
            Game.hudArea.scrap.innerHTML = this.scrap;
        }
    };
};