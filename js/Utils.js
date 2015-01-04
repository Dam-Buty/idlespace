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
        return Math.floor((boundaries[0] + (Math.random() * (boundaries[1] - boundaries[0]))));
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

    fitBackground: function(el) {
        Game.collider.area.el.appendChild(el);

        var x = 1, y = 1;
        var rect = el.getBoundingClientRect();

        for(var done = false;!done;) {
            var _x = rect.width * x;
            var _y = rect.height * y;

            if (_x < Game.collider.area.width + 200) {
                x += 1/100;
            }

            if (_y < Game.collider.area.height) {
                y += 1/100;
            }


            if (_y >= Game.collider.area.height &&
                _x >= Game.collider.area.width + 200) {
                done = true;
            }
        }

        el.style.transform = "scale(" + x + ", " + y + ")";
    },

    getSprite: function(name) {
      return document.getElementById("sprites").getElementsByClassName(name)[0].cloneNode(true);
    },

    radians: function(degrees) {
      return degrees * Math.PI / 180;
    }
};
