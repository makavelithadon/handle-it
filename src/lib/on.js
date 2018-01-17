//IE8 and lower compatible (useless but rewarding)

const addHandler = function addHandler (...args) {
  return ('addEventListener' in this) ? this.addEventListener(...args, 0) : this.attachEvent(...args);
};

module.exports = function (events) {
  return function on (...args) {
    const findElement = events.filter(handler => handler.el === this);
    if (findElement.length) { //the element already exists
      const findEvent = events.find(handler => handler.event === args[0] && handler.el === this);
      if (typeof findEvent !== 'undefined') { //the element has already this event registered
        findEvent.func.push(args[1]);
        addHandler.call(this, ...args);
      }
    }
    events.push({ el: this, event: args[0], func: [args[1]] });
    addHandler.call(this, ...args);
    return events;
  }
}