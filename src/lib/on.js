import { has, get, set } from "./utils.js";

function addHandler(...args) {
  "addEventListener" in this
    ? this.addEventListener(...args, 0)
    : this.attachEvent(...args);
  return args.pop();
}

export default function on(events) {
  return function on(el, event, cb) {
    if (!el || !event || !cb) {
      return events;
    }
    if (has(events, el)) {
      const mapEl = get(events, el);
      let eventHandlers = mapEl[event];
      if (eventHandlers) {
        eventHandlers.push(addHandler.call(el, event, cb));
      } else {
        eventHandlers = [addHandler.call(el, event, cb)];
        mapEl[event] = eventHandlers;
      }
    } else {
      set(events, el, { [event]: [addHandler.call(el, event, cb)] });
    }
    return events;
  };
}
