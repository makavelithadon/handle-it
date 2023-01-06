import type { AllEvents, CallBack, Elt, Evt } from '../types';
import { addEventListener } from './addEventListener';

// eslint-disable-next-line no-unused-vars
export type OnFunction = (element: Elt, event: Evt, callback: CallBack) => void;

const on = (events: AllEvents): OnFunction => {
  // eslint-disable-next-line no-shadow
  return function on(element: Elt, event: Evt, callback: CallBack): void {
    if (!element || !event || !callback) {
      return;
    }

    const foundElement = events.get(element);

    if (!foundElement) {
      events.set(element, {
        [event]: [addEventListener(element, event, callback)],
      });

      return;
    }

    foundElement[event] = [
      ...(foundElement[event] ?? []),
      addEventListener(element, event, callback),
    ];
  };
};

export { on };
