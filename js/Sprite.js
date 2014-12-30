var Sprite = function(options) {
    var sprite = document.getElementById("sprites").getElementsByClassName(options.id)[0];
    var width = sprite.offsetWidth;
    var height = sprite.offsetHeight;

    var top = 0, left = 0;

    if (options.top !== undefined) {
        if (options.top == -1) {
            top = Math.random() * (Game.gameArea.height - height);
        } else {
            top = options.top;
        }
    }

    if (options.left !== undefined) {
        if (options.left == -1) {
            left = Math.random() * (Game.gameArea.width - width);
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
        element: clone,

        top: top,
        left: left,
        width: width,
        height: height,

        speed: options.speed,
        warp: options.warp,

        hud: hud,

        collision: function(targets, max) {
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
            var elPos = getPositions(this);

            for(var i = 0;i < targets.length && (collisions.length < (max || targets.length));i++) {
                var targetPos = getPositions(targets[i].sprite);

                if (comparePositions(elPos[0], targetPos[0]) && comparePositions(elPos[1], targetPos[1])) {
                    collisions.push(targets[i]);
                }
            }

            return collisions;
        },

        ////////////////////
        // Move returns false if non-warping object has gotten out of the gameArea
        //
        // Warp determines how to handle when moving takes you out of the gameArea :
        // - undefined : no warp, object is confined inside the gameArea,
        // - false : no warp, object dies upon exiting the gameArea,
        // - true : warp, object reappears on the opposite of the screen
        move: function(direction) {

            switch(direction) {
                case "left":
                    this.left -= Game.chunk.x * this.speed;
                    break;
                case "up":
                    this.top -= Game.chunk.y * this.speed;
                    break;
                case "right":
                    this.left += Game.chunk.x * this.speed;
                    break;
                case "down":
                    this.top += Game.chunk.y * this.speed;
                    break;
            }

            if (this.left < 0 || this.top < 0
            || this.left > Game.gameArea.width
            || this.top > Game.gameArea.height) {

                switch(this.warp) {
                    case undefined:
                        switch(direction) {
                            case "left":
                                this.left = 0;
                                break;
                            case "up":
                                this.top = 0;
                                break;
                            case "right":
                                this.left = Game.gameArea.width - this.width;
                                break;
                            case "down":
                                this.top = Game.gameArea.height - this.height;
                                break;
                        }
                        break;

                    case false:
                        return false;
                        break;

                    case true:
                        switch(direction) {
                            case "left":
                                this.left = Game.gameArea.width;
                                break;
                            case "up":
                                this.top = Game.gameArea.height;
                                break;
                            case "right":
                                this.left = 0 - this.width;
                                break;
                            case "down":
                                this.top = 0 - this.height;
                                break;
                        }
                        break;
                }
            }

            this.element.style.top = this.top;
            this.element.style.left = this.left;

            return true;
        },
    };
}
