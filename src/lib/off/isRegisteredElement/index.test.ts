import { isRegisteredElement } from '.';

describe('isRegisteredElement', () => {
  test(`should return true
      - when a real EventTypeHandlersMap type is provided`, () => {
    expect(isRegisteredElement(undefined)).toBe(false);
    expect(isRegisteredElement({ click: [() => 'Hello World'] })).toBe(true);
  });
});
