const removeHandler = function removeHandler (...args) {
  return ('removeEventListener' in this) ? this.removeEventListener(...args) : this.detachEvent(...args);
};

module.exports = function (events) {
  return function off (...args) {
    let handler = events.filter(handler => handler.el === this);
    handler = handler.find(handler => handler.event === args[0]);
    const handlerIndex = events.findIndex(h => h === handler);
    if (typeof handler !== 'undefined') {
      if (!args[1]) {
        events.splice(handlerIndex, 1);
        handler.func.forEach(f => removeHandler.call(this, args[0], f));
      } else {
        handler.func.forEach(f => {
          if (f.toString() === args[1].toString()) {
            events.splice(handlerIndex, 1);
            removeHandler.call(this, args[0], f);
          }
        });
      }
    }
    return events;
  }
}