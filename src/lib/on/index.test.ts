import { on, type OnFunction } from '.';
import { AllEvents } from '../types';
import { mockAddEventListener } from '../../../test-utils';

let mapEvents: AllEvents;
let hydratedOn: OnFunction;

const button = document.createElement('button');

mockAddEventListener(button);

beforeAll(() => {
  mapEvents = new Map();
  hydratedOn = on(mapEvents);
});

describe('on', () => {
  test(`should early return if none of the required parameters are not provided`, () => {
    const returned = hydratedOn(...([] as unknown as Parameters<OnFunction>));

    expect(returned).toBeUndefined();
    expect(mapEvents.size).toEqual(0);
  });

  test(`should call 'on' function
      - with element, event and callback parameters
      - and call element.addEventListener native method with event and callback parameters
      - and register a new event listener for element in events Map`, () => {
    const mockClickCallback = jest.fn();

    hydratedOn(button, 'click', mockClickCallback);

    expect(button.addEventListener).toHaveBeenNthCalledWith(
      1,
      'click',
      mockClickCallback,
      false
    );
    expect(mapEvents.get(button)).toStrictEqual({ click: [mockClickCallback] });
  });

  test(`should call 'on' function
      - with element, event and callback parameters
      - and call element.addEventListener native method with event and callback parameters
      - and :
        - update the existing event if a callback already exists for this event
        - or register a new eventhandlers array for the new event`, () => {
    const mockClickCallback = jest.fn();
    const mockHoverCallback = jest.fn();
    const mockLeaveCallback = jest.fn();
    const mockDblClickCallback = jest.fn();

    hydratedOn(button, 'click', mockClickCallback);

    expect(button.addEventListener).toHaveBeenNthCalledWith(
      2,
      'click',
      mockClickCallback,
      false
    );
    expect(mapEvents.get(button)).toStrictEqual({
      click: [expect.any(Function), mockClickCallback],
    });

    hydratedOn(button, 'mouseover', mockHoverCallback);
    hydratedOn(button, 'mouseleave', mockLeaveCallback);
    hydratedOn(button, 'dblclick', mockDblClickCallback);

    expect(button.addEventListener).toHaveBeenNthCalledWith(
      3,
      'mouseover',
      mockHoverCallback,
      false
    );
    expect(button.addEventListener).toHaveBeenNthCalledWith(
      4,
      'mouseleave',
      mockLeaveCallback,
      false
    );
    expect(button.addEventListener).toHaveBeenNthCalledWith(
      5,
      'dblclick',
      mockDblClickCallback,
      false
    );
    expect(mapEvents.get(button)).toStrictEqual({
      click: [expect.any(Function), mockClickCallback],
      mouseover: [mockHoverCallback],
      mouseleave: [mockLeaveCallback],
      dblclick: [mockDblClickCallback],
    });
  });
});
