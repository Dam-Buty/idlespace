var Upgrayedd = function() {
  return {
    upgrades: [],
    live: [],

    cutOff: 35/100,                 // Upgrade appears when the player has this much of its price

    start: function() {
      var self = this;
      this.upgrades = upgrades;

      for(var i = 0;i < this.upgrades.length;i++) {
        this.add(this.upgrades[i]);
      }

      Game.riddim.plan(function() {
        self.check();
      }).every(5);

      return this;
    },

    check: function() {
      for(var i = 0;i < this.live.length;i++) {
        var upgrade = this.live[i];
        var price = upgrade.getPrice();

        if (Game.ship.scrap / price > this.cutOff) {
          upgrade.show();
          if (Game.ship.scrap >= price) {
            upgrade.card.el.classList.remove("expensive");
          } else {
            upgrade.card.el.classList.add("expensive");
          }
        } else {
          upgrade.hide();
        }
      }
    },

    add: function(options) {
      var upgrade = Upgrade(options).init();

      this.live.push(upgrade);

      Game.upgradesArea.el.appendChild(upgrade.card.el);
    },

    remove: function(card) {
      Game.upgradesArea.el.removeChild(card);
    }
  };
};
