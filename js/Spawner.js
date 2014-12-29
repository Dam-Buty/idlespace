var Spawner = function() {
    return {
        enemies: enemies,
        minDelay: 100,
        maxDelay: 300,
        
        isEligible: function(enemy) {
            return (enemy.sectors[0] <= Game.sector && Game.sector <= enemy.sectors[1]);
        },

        populateEnemy: function(enemy) {
            var score = Math.random();
            var population = 0;
            var spawned = [];
            
            if (score <= ((Game.sector - enemy.sectors[0]) / (enemy.sectors[1] - enemy.sectors[0]))) {
                population = Utils.distribution([1, enemy.population], score);
            }
            
            for(var i = 0;i < population;i++) {
                spawned.push(Enemy(enemy));
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
