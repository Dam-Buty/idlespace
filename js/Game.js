var Game = {
    paused: false,
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

    pause: function() {
      if (!this.paused) {
        Game.collider.stop();
        Game.riddim.stop();
      } else {
        Game.collider.start();
        Game.riddim.start();
      }

      this.paused = !this.paused;
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
            }).in(
              Utils.linear([Game.spawner.minDelay, Game.spawner.maxDelay])
            );
          }
        }
      }
    },

    go: function() {
      var self = this;
      document.getElementsByTagName("header")[0].onclick = function() {
        self.checkSector();
      }
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
        this.km = Keymapper(this.ship.systems.triage).start();
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
      var loots = {
        hp: 0.1,
        life: 0.01,
        upgrade: 0.01,
      };

      options.scrap *= this.ship.systems.extractor.rate;

      var values = [
        1000000,
        500000,
        200000,
        100000,
        50000,
        20000,
        10000,
        5000,
        1000,
        500,
        100,
        50,
        10,
        5,
        1
      ];
      for (;options.scrap >= 0.5;) {
        options.scrap = Math.max(1, options.scrap);
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
