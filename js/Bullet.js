var Bullet = function(options) {
    var sprite = Sprite({
        id: "bullet",
        
        top: Game.ship.sprite.top + (Game.ship.sprite.height / 2),
        left: Game.ship.sprite.left + Game.ship.sprite.width,
        
        speed: options.speed,
        warp: false
    });
    
    return {
        delay: 100,
        handle: undefined,        
        
        hostile: options.hostile,
        direction: options.direction,
        
        damage: options.damage,
        
        sprite: sprite,
        
        move: function() {
            var self = this;
            
            if (!this.sprite.move(this.direction) || this.collision()) {
                this.die();
            } else {
                this.handle = setTimeout(function() {
                    self.move();
                }, this.delay);
            }
        },
        
        collision: function() {
            var shot = this.sprite.collision(Game.enemies.live, 1);
            
            if (shot.length > 0) {
                shot[0].hit(this.damage);
                return true;
            }
            
            return false;
        },
        
        die: function() {
            clearInterval(this.handle);
            this.handle = undefined;
            Game.gameArea.element.removeChild(this.sprite.element);
        }
    };
};
