var Game = {
    sector: 0,
    handle: undefined,

    riddim: undefined,
    collider: undefined,
    spawner: undefined,
    ship: undefined,

    hudArea: {
        element: undefined,
        gameSector: undefined,
        scrap: undefined
    },

    enemies: {
        queue: [],

        spawn: function() {
            if (this.queue.length > 0) {
                var spawning = this.queue.shift();
                var self = this;

                Game.collider.spawn(spawning.entity);

                if (this.queue.length > 0) {
                  Game.riddim.plan(function() {
                    self.spawn();
                  }).in(Utils.linear([Game.spawner.minDelay, Game.spawner.maxDelay]));
                }
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
        // Init HUD
        this.hudArea.element = document.getElementById("hud-area");
        this.hudArea.gameSector = document.getElementById("game-sector");
        this.hudArea.shipLives = document.getElementById("ship-lives");
        this.hudArea.scrap = document.getElementById("ship-scrap");

        // Init spawner and ship
        this.riddim = Riddim().start();
        this.collider = Collider(document.getElementById("game-area")).start();
        this.ship = Ship().init();
        this.spawner = Spawner();
        //this.ship.systems.weapons.start();

        // Map keyboard
        Utils.keyMap();

        //this.background();

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
