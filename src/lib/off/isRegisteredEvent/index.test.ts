import { isRegisteredEvent } from '.';

describe('isRegisteredEvent', () => {
  test(`should return true
      - when a real CallBack[] type is provided`, () => {
    expect(isRegisteredEvent(undefined)).toBe(false);
    expect(isRegisteredEvent([() => 'Hello World'])).toBe(true);
  });
});
