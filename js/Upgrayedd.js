var Upgrayedd = function() {
  return {
    systems: [],

    start: function() {
      var self = this;
      this.systems = upgrades;

      for(var i = 0;i < this.systems.length;i++) {
        
      }


      Game.riddim.plan(function() {
        self.tick();
        return true;
      }).every(5);

      return this;
    },

    isBuyable: function(upgrade) {
      return upgrade.price < Game.ship.scrap;
    },

    tick: function() {
      if (this.live.length < 2 && Math.random() < 1) {
        var buyables = this.upgrades.filter(this.isBuyable, this);
        if (buyables.length > 0) {
          var spawn = buyables[Math.floor(Math.random() * buyables.length)];
          this.spawn(spawn);
        }
      }
    },

    spawn: function(upgrade) {
      this.live.push(true);

      Game.collider.spawn(Upgrade(upgrade).init());
    }
  };
};
