var Pact = function(value, element) {
  return {
    value: value,
    el: element,

    refresh: function() {
      this.el.innerHTML = this.value;
    },

    toString: function() {
      return this.value;
    },

    plus: function(x) {
      this.value += x;
      this.refresh();
    },

    minus: function(x) {
      this.value -= x;
      this.refresh();
    },

    set: function(x) {
      this.value = x;
      this.refresh();
    }
  };
};
