(() => {

  const events = [];

  //IE8 and lower compatible (useless but rewarding)

  const addHandler = function addHandler (...args) {
    return ('addEventListener' in this) ? this.addEventListener(...args, 0) : this.attachEvent(...args);
  };

  const removeHandler = function removeHandler (...args) {
    return ('removeEventListener' in this) ? this.removeEventListener(...args) : this.detachEvent(...args);
  };

  Element.prototype.on = function(...args) {
    const findElement = events.filter(handler => handler.el === this);
    if (findElement.length) { //the element already exists
      const findEvent = events.find(handler => handler.event === args[0] && handler.el === this);
      if (typeof findEvent !== 'undefined') { //the element has already this event registered
        findEvent.func.push(args[1]);
        addHandler.call(this, ...args);
        return;
      }
    }
    events.push({ el: this, event: args[0], func: [args[1]] });
    addHandler.call(this, ...args);
  };

  Element.prototype.off = function(...args) {
    let handler = events.filter(handler => handler.el === this);
    handler = handler.find(handler => handler.event === args[0]);
    const handlerIndex = events.findIndex(h => h === handler);
    if (typeof handler !== 'undefined') {
      if (!args[1]) {
        events.splice(handlerIndex, 1);
        handler.func.forEach(f => removeHandler.call(this, args[0], f));
        return;
      }
      handler.func.forEach(f => {
        if (f.toString() === func.toString()) {
          events.splice(handlerIndex, 1);
          removeHandler.call(this, args[0], f);
        }
      });
    }
  };
})();
