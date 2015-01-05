var Game = {
    sector: 0,
    handle: undefined,

    riddim: undefined,
    collider: undefined,
    spawner: undefined,
    ship: undefined,
    km: undefined,
    upgrayedd: undefined,

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
        this.hudArea.hp = document.getElementById("ship-HP");

        // Init spawner and ship
        this.riddim = Riddim().start();
        this.collider = Collider(document.getElementById("game-area")).start();
        this.ship = Ship().init();
        this.spawner = Spawner();
        this.upgrayedd = Upgrayedd().start();
        this.ship.systems.weapons.start();

        this.hudArea.hp.innerHTML = this.ship.entity.hp;

        //this.background();

        this.nextSector();
    },

    background: function() {
        Utils.fitBackground(Utils.background("far").cloneNode(true));
        Utils.fitBackground(Utils.background("near").cloneNode(true));
    },

    checkSector: function() {
      if (this.collider.teams[1].length == 0) {
        this.nextSector();
      }
    },

    nextSector: function() {
        this.sector++;
        while(this.enemies.queue.length == 0) {
          this.spawner.populateSector();
        }
        this.enemies.spawn();

        this.hudArea.gameSector.innerHTML = this.sector;
    },

    scrap: function(options) {
        var values = [1000, 500, 100, 50, 10, 5, 1];
        for (;options.scrap > 0;) {
            for(var i = 0;i < values.length;i++) {
                var value = values[i];

                if (options.scrap >= value) {
                    var top = options.top + (Math.random() * options.height);
                    var left = options.left + (Math.random() * options.width);

                    Game.collider.spawn(Scrap({
                      direction: options.direction,
                      speed: options.speed,
                      top: top,
                      left: left,
                      value: value
                    }));

                    options.scrap -= value;
                    break;
                }
            }
        }
    }
};
