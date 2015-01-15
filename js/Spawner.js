var Spawner = function() {
    return {
        enemies: enemies,
        minDelay: 1,
        maxDelay: 10,

        isEligible: function(enemy) {
          if (enemy.sectors[0] === undefined) {
            return (enemy.sectors == Game.sector);
          } else {
            return (enemy.sectors[0] <= Game.sector && Game.sector <= enemy.sectors[1]);
          }
        },

        populateEnemy: function(enemy) {
          var spawned = [];
          
          if (enemy.sectors[0] === undefined) {
            spawned.push(Enemy(enemy).init(0));
          } else {
            var score = Math.random();
            var relativeLevel = ((Game.sector - enemy.sectors[0]) / (enemy.sectors[1] - enemy.sectors[0]));
            var population = 0;

            if (score <= relativeLevel) {
              population = Utils.linear([1 * relativeLevel, enemy.population]);
            }

            for(var i = 0;i < population;i++) {
              spawned.push(Enemy(enemy).init(relativeLevel));
            }
          }

          return spawned;
        },

        populateSector: function() {
            var eligible = this.enemies.filter(this.isEligible, this);
            var spawned = [];

            for(var i = 0;i < eligible.length;i++) {
                spawned = spawned.concat(
                    this.populateEnemy(eligible[i])
                );
            }

            spawned = Utils.shuffleArray(spawned);

            Game.enemies.queue = Game.enemies.queue.concat(spawned);
        }
    };
};
