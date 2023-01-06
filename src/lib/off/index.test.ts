import { off, type OffFunction } from '.';
import { AllEvents } from '../types';
import { mockRemoveEventListener } from '../../../test-utils';

let mapEvents: AllEvents;
let hydratedOff: OffFunction;
const button = document.createElement('button');

const mockOnClickButtonCallback = jest.fn();
const mockOnClickButtonCallback2 = jest.fn();
const mockOnMouseOverButtonCallback = jest.fn();
const mockOnScrollWindowCallback = jest.fn();

describe('off', () => {
  beforeEach(() => {
    mockRemoveEventListener(button);
    mockRemoveEventListener(window);

    mapEvents = new Map();

    // Button element has two registered event handlers ('click' and 'mouseover')
    mapEvents.set(button, {
      click: [mockOnClickButtonCallback, mockOnClickButtonCallback2],
      mouseover: [mockOnMouseOverButtonCallback],
    });

    // Window global Object has only one registered event handler ('scroll')
    mapEvents.set(window, {
      scroll: [mockOnScrollWindowCallback],
    });

    hydratedOff = off(mapEvents);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('element input', () => {
    test(`should call 'off' function
        - with element parameter only
        - and remove all registered event handlers for the given element from ALL events
        - and remove this element from the Map events`, () => {
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(button);

      expect(button.removeEventListener).toHaveBeenNthCalledWith(
        1,
        'click',
        mockOnClickButtonCallback
      );
      expect(button.removeEventListener).toHaveBeenNthCalledWith(
        2,
        'click',
        mockOnClickButtonCallback2
      );

      expect(button.removeEventListener).toHaveBeenNthCalledWith(
        3,
        'mouseover',
        mockOnMouseOverButtonCallback
      );
      expect(mapEvents.get(button)).toBeUndefined();
      expect(mapEvents).toHaveProperty('size', 1);

      hydratedOff(window);

      expect(window.removeEventListener).toHaveBeenNthCalledWith(
        1,
        'scroll',
        mockOnScrollWindowCallback
      );
      expect(mapEvents.get(window)).toBeUndefined();
      expect(mapEvents).toHaveProperty('size', 0);
    });

    test(`should do nothing
        - when element parameter is not registered yet`, () => {
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(document.body);

      expect(mapEvents).toHaveProperty('size', 2);
    });
  });

  describe('element AND event inputs', () => {
    test(`should call 'off' function
      - with element AND event parameters only
      - and remove all registered event handlers for the given element and given event
      - and remove this event from the registered element in Event map
      - and remove element from events Map if no event remains in it`, () => {
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(button, 'click');

      expect(button.removeEventListener).toHaveBeenNthCalledWith(
        1,
        'click',
        mockOnClickButtonCallback
      );
      expect(button.removeEventListener).toHaveBeenNthCalledWith(
        2,
        'click',
        mockOnClickButtonCallback2
      );
      expect(mapEvents.get(button)).toBeDefined();
      expect(mapEvents).toHaveProperty('size', 2);

      // Check that that 'mouseover' event handlers are still in the events Map
      expect(mapEvents.get(button)?.mouseover).toStrictEqual([
        mockOnMouseOverButtonCallback,
      ]);
      expect(button.removeEventListener).not.toHaveBeenCalledWith('mouseover');
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(button, 'mouseover');
      hydratedOff(window, 'scroll');

      expect(button.removeEventListener).toHaveBeenNthCalledWith(
        3,
        'mouseover',
        mockOnMouseOverButtonCallback
      );

      expect(window.removeEventListener).toHaveBeenNthCalledWith(
        1,
        'scroll',
        mockOnScrollWindowCallback
      );

      expect(mapEvents).toHaveProperty('size', 0);
    });

    test(`should do nothing
        - when element parameter is not registered yet
        - when event parameter is not registered yet`, () => {
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(document.body);

      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(window, 'resize');

      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(document.createElement('h1'), 'click');

      expect(mapEvents).toHaveProperty('size', 2);
    });
  });

  describe('element AND event AND callback inputs', () => {
    test(`should call 'off' function
        - with element AND event AND callback parameters
        - and remove given event handler/callback from the registerer elemnt[event] from events Map
        - and remove event handlers for this event if no callback remaing in it
        - and remove element from events Map if no event remains in it`, () => {
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(button, 'click', mockOnClickButtonCallback);

      // Verify that the first callback has been removed from the event handlers array on element[event] from events Map
      expect(mapEvents.get(button)?.click).toStrictEqual([
        mockOnClickButtonCallback2,
      ]);

      hydratedOff(button, 'click', mockOnClickButtonCallback2);

      expect(mapEvents.get(button)).toStrictEqual({
        mouseover: [mockOnMouseOverButtonCallback],
      });

      hydratedOff(button, 'mouseover', mockOnMouseOverButtonCallback);

      expect(mapEvents.get(button)).not.toBeDefined();
      expect(mapEvents).toHaveProperty('size', 1);

      hydratedOff(window, 'scroll', mockOnScrollWindowCallback);

      expect(mapEvents.get(window)).not.toBeDefined();
      expect(mapEvents).toHaveProperty('size', 0);
    });

    test(`should do nothing
        - when element parameter is not registered yet
        - when event parameter is not registered yet
        - when callback parameter is not registered`, () => {
      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(document.body, 'scroll', () => 'Hello World');

      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(button, 'scroll', () => 'Hello World');

      expect(mapEvents).toHaveProperty('size', 2);

      hydratedOff(button, 'click', () => 'Hello World');

      expect(mapEvents).toHaveProperty('size', 2);
    });
  });
});
