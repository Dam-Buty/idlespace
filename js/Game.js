var Game = {
    sector: undefined,

    riddim: undefined,
    collider: undefined,
    spawner: undefined,
    ship: undefined,
    km: undefined,
    upgrayedd: undefined,

    hudArea: {
        element: undefined,
        sector: undefined,
        scrap: undefined,
        lives: undefined
    },

    upgradesArea: {
      el: undefined,
      dummy: undefined
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
        this.hudArea.sector = document.getElementById("game-sector");
        this.hudArea.scrap = document.getElementById("ship-scrap");
        this.hudArea.lives = document.getElementById("ship-lives");

        this.upgradesArea.el = document.getElementById("upgrades-area");
        this.upgradesArea.dummy = this.upgradesArea.el.getElementsByClassName("dummy")[0];

        this.sector = Pact(0, this.hudArea.sector);

        // Init spawner and ship
        this.riddim = Riddim().start();
        this.collider = Collider(document.body).start();
        this.ship = Ship().init();
        this.spawner = Spawner();
        this.upgrayedd = Upgrayedd().start();
        // this.ship.systems.weapons.start();

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
        this.sector.plus(1);
        while(this.enemies.queue.length == 0) {
          this.spawner.populateSector();
        }
        this.enemies.spawn();
    },

    loot: function(options) {
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
