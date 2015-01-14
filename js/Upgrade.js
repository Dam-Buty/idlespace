var Upgrade = function(options) {
  return {
    price: options.price,
    stats: options.stats || undefined,

    short: options.short,
    description: options.description,

    effect: options.effect,

    card: {
        el: undefined,
        short: undefined,
        price: undefined,
        description: undefined
    },

    getPrice: function() {
      return this.price[0] || this.price;
    },

    buy: function() {
      var effect, price, stats;
      var self = this;

      if (this.stats === undefined) {
        price = this.price;
        effect = function() {
          self.effect();
          Game.upgrayedd.remove(self.card.el);
        };
      } else {
        price = this.price.shift();
        stat = this.stats.shift();
        effect = function() {
          self.effect(stat);

          if (self.price.length == 0) {
            Game.upgrayedd.remove(self.card.el);
          } else {
            self.refresh();
          }
        };
      }

      if (price <= Game.ship.scrap) {
        Game.ship.scrap.minus(price);
        effect();
      }
    },

    refresh: function() {
      this.card.short.innerHTML = this.short;
      this.card.price.innerHTML = this.getPrice();
      this.card.description.innerHTML = this.description;
    },

    show: function() {
      this.card.el.style.display = '';
    },

    hide: function() {
      this.card.el.style.display = 'none';
    },

    init: function() {
      var self = this;
      this.card.el = Game.upgradesArea.dummy.cloneNode(true);
      this.card.short = this.card.el.getElementsByClassName("short")[0];
      this.card.price = this.card.el.getElementsByClassName("price")[0];
      this.card.description = this.card.el.getElementsByClassName("description")[0];

      this.card.el.classList.remove("dummy");

      this.card.el.addEventListener("click", function() {
        self.buy();
      });

      this.refresh();

      return this;
    }
  };
};
