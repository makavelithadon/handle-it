import onFn from "./lib/on.js";
import offFn from "./lib/off.js";

const events = new Map();

export const on = onFn(events);
export const off = offFn(events);
