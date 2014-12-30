var Enemy = function(enemy) {
    var sprite = Sprite({
        id: enemy.name,
        
        top: -1,
        left: Game.gameArea.width,
        
        speed: enemy.speed,
        warp: enemy.warp,
        
        hud: ["hp"]
    });
    
    return {
        idx: undefined,
        handle: undefined,
        
        name: enemy.name,
        maxHP: enemy.hp,
        hp: enemy.hp,
        shield: enemy.shield,
        
        scrap: Utils.linear(enemy.scrap),
        delay: Utils.linear([Game.spawner.minDelay, Game.spawner.maxDelay]),
        
        exploding: false,
        
        sprite: sprite,
        
        spawn: function() {            
//            this.sprite.element.style.transitionDuration = this.delay;
            
            this.move();
        },
        
        move: function() {
            if (!this.exploding) {
                var self = this;
                
                this.sprite.move("left");
                
                if (!this.collision()) {
                    this.handle = setTimeout(function() {
                        self.move();
                    }, this.delay); 
                }                
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
            var hit = this.sprite.collision([Game.ship], 1);
            
            if (hit.length > 0) {
                hit[0].hit(this.shield);
                this.hit(hit[0].shield);
                return true;
            }
            
            return false;
        },
        
        hit: function(damage) {
            if (!this.exploding) {
                this.hp = this.hp - damage;
                
                if (this.hp <= 0) {
                    this.die();
                } else {
                    this.sprite.hud.hp.style.width = (this.hp * 100 / this.maxHP) + "%";
                }
            }
        },
        
        die: function() {
            var self = this;
            
            clearInterval(this.handle);
            this.handle = undefined;
            
            this.exploding = true;
            
            this.sprite.element.removeChild(this.sprite.hud.hp);
            this.sprite.element.classList.add("exploding");
            
            setTimeout(function() {
                Game.scrap(self.scrap, self.delay, {
                    width: self.sprite.width,
                    height: self.sprite.height,
                    top: self.sprite.top,
                    left: self.sprite.left
                });
                
                Game.gameArea.element.removeChild(self.sprite.element);
                
                Game.enemies.kill(self.idx);
            }, 1000);
        }
    };
};
