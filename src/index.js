(() => {

  const events = [];
  const on = require('./lib/on')(events)
  const off = require('./lib/off')(events)

  Element.prototype.on = on;
  Element.prototype.off = off;

})();
