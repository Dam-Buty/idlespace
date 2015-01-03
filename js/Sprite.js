var Sprite = function(options) {
    var sprite = document.getElementById("sprites").getElementsByClassName(options.id)[0];
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;

    var top = 0, left = 0;

    if (options.top !== undefined) {
        if (options.top == -1) {

        } else {
            top = options.top;
        }
    }

    if (options.left !== undefined) {
        if (options.left == -1) {
            left = ;
        } else {
            left = options.left;
        }
    }

    var clone = sprite.cloneNode(true);
    clone.style.top = top;
    clone.style.left = left;

    var hud = {};

    if (options.hud !== undefined) {
        for(var i = 0;i < options.hud.length;i++) {
            hud[options.hud[i]] = clone.getElementsByClassName(options.hud[i])[0];
        }
    }

    Game.gameArea.element.appendChild(clone);

    return {
        el: options.el,

        top: options.top,
        left: options.left,
        width: 0,
        height: 0
    };
}
