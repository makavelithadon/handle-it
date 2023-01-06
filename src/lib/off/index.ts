import { AllEvents, CallBack, Elt, Evt } from '../types';
import { areEqualFunctions } from './areEqualFunctions';
import { removeEventListener } from './removeEventListener';
import { isRegisteredElement } from './isRegisteredElement';
import { isRegisteredEvent } from './isRegisteredEvent';
import { isRegisteredCallback } from './isRegisteredCallback';
import { excludeKeyFromObject, warnIf } from '../utils';

/* eslint-disable no-unused-vars */
export type OffFunction = (
  element: Elt,
  event?: Evt,
  callback?: CallBack
) => void;
const off = (events: AllEvents): OffFunction => {
  // eslint-disable-next-line no-shadow
  return function off(element: Elt, event?: Evt, callback?: CallBack): void {
    if (element && !event && !callback) {
      const mapElement = events.get(element);
      const isCorrectElement = isRegisteredElement(mapElement);

      warnIf(
        !isCorrectElement,
        `[handle-it] Unable to remove any event listener on ${element} element as it has not been registered yet!`
      );

      if (!isCorrectElement) {
        return;
      }

      Object.entries(mapElement).forEach(([registeredEvent, handlers]) => {
        handlers.forEach(fn =>
          removeEventListener(element, registeredEvent as Evt, fn)
        );
      });

      events.delete(element);

      return;
    }

    if (element && event && !callback) {
      const mapElement = events.get(element);
      const eventHandlers = mapElement?.[event];
      const isCorrectElement = isRegisteredElement(mapElement);
      const isCorrectEvent = isRegisteredEvent(eventHandlers);

      [
        {
          assertion: isCorrectElement,
          message: `[handle-it] Unable to remove any event listener on ${element} element as it has not been registered yet!`,
        },
        {
          assertion: isCorrectEvent,
          message: `[handle-it] Unable to remove event listeners for ${event} event on ${element} element as this event has not been registered yet!`,
        },
      ].forEach(({ assertion, message }) => warnIf(!assertion, message));

      if (!isCorrectElement || !isCorrectEvent) {
        return;
      }

      eventHandlers.forEach(handler => {
        removeEventListener(element, event, handler);
      });

      const otherEventHandlers = excludeKeyFromObject(mapElement, event);

      if (Object.keys(otherEventHandlers).length <= 0) {
        events.delete(element);
      } else {
        events.set(element, otherEventHandlers);
      }

      return;
    }

    if (element && event && callback) {
      const mapElement = events.get(element);
      const eventHandlers = mapElement?.[event];
      const foundCallback = eventHandlers?.find(cb =>
        areEqualFunctions(cb, callback)
      );

      const isCorrectElement = isRegisteredElement(mapElement);
      const isCorrectEvent = isRegisteredEvent(eventHandlers);
      const isCorrectCallback = isRegisteredCallback(foundCallback);

      warnIf(
        !isCorrectElement,
        `[handle-it] Unable to remove any event listener on ${element} element as it has not been registered yet!`
      );

      warnIf(
        !isCorrectEvent,
        `[handle-it] Unable to remove event listeners for ${event} event on ${element} element as this event has not been registered yet!`
      );

      warnIf(
        !isCorrectCallback,
        `[handle-it] Unable to remove the ${callback} callback from ${event} event on the ${element} element as it has not been registered yet!`
      );

      if (!isCorrectElement || !isCorrectEvent || !isCorrectCallback) {
        return;
      }

      const callbackIndex = eventHandlers.findIndex(cb =>
        areEqualFunctions(cb, callback)
      );

      removeEventListener(element, event, foundCallback);

      const cleanedUpCallbacks = [
        ...eventHandlers.slice(0, callbackIndex),
        ...eventHandlers.slice(callbackIndex + 1),
      ];

      mapElement[event] = cleanedUpCallbacks;

      const updatedElement = {
        ...excludeKeyFromObject(mapElement, event),
        ...(cleanedUpCallbacks.length > 0 && { [event]: mapElement[event] }),
      };

      if (Object.keys(updatedElement).length <= 0) {
        events.delete(element);
      } else {
        events.set(element, updatedElement);
      }
    }
  };
};

export { off };
