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

    riddim: undefined,
    spawner: undefined,
    ship: undefined,

    gameArea: {
        element: undefined,
        background: {
            far: undefined,
            near: undefined
        },
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
            if (this.live.length === 0) {
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
        this.riddim = Riddim().start();
        this.spawner = Spawner();
        this.ship = Ship();
        this.ship.systems.weapons.start();

        // Map keyboard
        Utils.keyMap();

        this.background();

        this.nextSector();
    },

    background: function() {
        this.gameArea.background.far = Utils.background("far").cloneNode(true);
        this.gameArea.background.near = Utils.background("near").cloneNode(true);

        Utils.fitBackground(this.gameArea.background.far);
        Utils.fitBackground(this.gameArea.background.near);
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

                if (scrap >= value) {
                    var top = coords.top + (Math.random() * coords.height);
                    var left = coords.left + (Math.random() * coords.width);

                    Scrap({
                        top: top,
                        left: left,
                        delay: delay,
                        value: value
                    }).move();
                    scrap -= value;
                    break;
                }
            }
        }
    }
};
