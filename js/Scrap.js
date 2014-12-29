var Scrap = function(options) {
    var sprite = Sprite({
        id: "scrap",
        
        top: options.top,
        left: options.left,
        
        speed: 1,
        warp: false
    });
    
    return {
        handle: undefined,
        delay: options.delay,
        
        value: options.value,
        
        sprite: sprite,
        
        move: function() {
            if (!this.sprite.move() || this.collision()) {
                this.die();
            } else {
                this.handle = setInterval(function() {
                    self.move();
                }, this.delay);
            }
        },
        
        collision: function() {
            var ship = this.sprite.collision([Game.ship], 1);
            
            if (ship.length > 0) {
                ship[0].addScrap(this.value);
                return true;
            }
            
            return false;
        },
        
        die: function() {
            var self = this;
            
            clearInterval(this.handle);
            this.handle = undefined;
            this.sprite.element.innerHTML = this.value;
            this.sprite.element.classList.add("scrapping");
            
            setTimeout(function() {
                Game.gameArea.element.removeChild(self.sprite.element);
            }, 500);
        }
    };
};
