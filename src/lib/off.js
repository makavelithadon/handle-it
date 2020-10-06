import { has, get, del, set } from "./utils.js";

function removeHandler(...args) {
  "removeEventListener" in this
    ? this.removeEventListener(...args)
    : this.detachEvent(...args);
  return args.pop();
}

function areEqualFns(fn1, fn2) {
  return fn1 === fn2 || fn1.toString() === fn2.toString();
}

function clean(map, el, event) {
  const mapEl = get(map, el);
  if (mapEl) {
    if (mapEl[event] && mapEl[event].filter(Boolean).length <= 0) {
      delete mapEl[event];
    }
    if (Object.keys(mapEl).length <= 0) {
      del(map, el);
    }
  }
}

export default function off(events) {
  return function off(el, event, cb) {
    if (has(events, el)) {
      const mapEl = get(events, el);
      if (!event) {
        Object.entries(mapEl).map(([e, arrayFns]) =>
          arrayFns.map((fn) => removeHandler.call(el, e, fn))
        );
        del(events, el);
        clean(events, el, event);
        return events;
      }
      if (!cb) {
        mapEl[event].map((fn) => removeHandler.call(el, event, fn));
        mapEl[event].length = 0;
        clean(events, el, event);
        return events;
      }
      const foundCbIndex = mapEl[event].findIndex((fn) => areEqualFns(fn, cb));

      if (foundCbIndex !== -1) {
        removeHandler.call(el, event, mapEl[event][foundCbIndex]);
        mapEl[event] = [
          ...mapEl[event].slice(0, foundCbIndex),
          ...mapEl[event].slice(foundCbIndex + 1),
        ];
      }
      clean(events, el, event);
      return events;
    }
    return events;
  };
}
