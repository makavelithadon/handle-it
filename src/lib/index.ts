import { on as onFn } from './on';
import { off as offFn } from './off';
import { AllEvents } from './types';

const events: Readonly<AllEvents> = new Map();

const on = onFn(events);
const off = offFn(events);

const debug = (): Readonly<AllEvents> => {
  // Create a new frozen Map instance to prevent the consumer trash the original Events Map
  return Object.freeze(new Map(events));
};

export { on, off, debug };
