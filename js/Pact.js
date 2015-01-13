var Pact = function(value, element, attribute, unit) {
  return {
    originalValue: value,
    value: value,
    el: element,
    attr: attribute || "",
    unit: unit || "",

    refresh: function() {
      var value = "";

      if (this.el !== undefined) {
        if (this.attr == "") {
          this.el.innerHTML = this.value;
        } else {
          if (this.unit != "") {
            if (this.unit == "%") {
            } else {
              value = this.value + " " + this.unit;
            }
            switch(this.unit) {
              case "%":
                value = Math.max(Math.floor(this.value / this.originalValue * 100), 0) + this.unit;
                break;
              case "/1":
                value = Math.max((this.value / this.originalValue), 0).toFixed(2);
                break;
              default:
                value = this.value + " " + this.unit;
            }
          } else {
            value = this.value;
          }

          this.el.style.setProperty(this.attr, value);
        }
      }

      return this;
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

    by: function(x) {
      this.value *= x;
      this.refresh();
    },

    set: function(x) {
      this.value = x;
      this.refresh();
    },

    upTo: function(x) {
      x = x || this.originalValue;
      this.value = Math.min(x, this.value);
      this.refresh();
    },

    downTo: function(x) {
      x = x || 0;
      this.value = Math.max(x, this.value);
      this.refresh();
    },

    reset: function(x) {
      this.originalValue = x;
      this.refresh();
    },

    resetPlus: function(x) {
      this.originalValue += x;
      this.refresh();
    },

    resetMinus: function(x) {
      this.originalValue -= x;
      this.refresh();
    },
  }.refresh();
};
