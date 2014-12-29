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
    
    background: function(name) {
        return document.getElementById("backgrounds").getElementsByClassName(name)[0];
    },
    
    keyMap: function() {
        document.onkeydown = function (e) {
            e = e || window.event;
            // use e.keyCode
            
//            console.log(e.keyCode);
            
            switch(e.keyCode) {
                case 32:
//                    if (Game.ship.systems.weapons.handle === undefined) {
//                        Game.ship.systems.weapons.start();
//                    }
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
//                    Game.ship.systems.weapons.stop();
                    break;
            }
        };
    },
    
    fitBackground: function(el) {        
        Game.gameArea.element.appendChild(el);
        
        var x = 1, y = 1;
        var rect = el.getBoundingClientRect();
        
        for(var done = false;!done;) {
            var _x = rect.width * x;
            var _y = rect.height * y;
            
            if (_x < Game.gameArea.width + 200) {
                x += 1/100;
            }
            
            if (_y < Game.gameArea.height) {
                y += 1/100;
            }
            
            
            if (_y >= Game.gameArea.height &&
                _x >= Game.gameArea.width + 200) {
                done = true;
            }
        }
        
        el.style.transform = "scale(" + x + ", " + y + ")";
    }
};
