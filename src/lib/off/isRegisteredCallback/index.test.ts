import { isRegisteredCallback } from '.';

describe('isRegisteredCallback', () => {
  test(`should return true
      - when a real CallBack type is provided`, () => {
    expect(isRegisteredCallback(undefined)).toBe(false);
    expect(isRegisteredCallback(() => 'Hello World')).toBe(true);
  });
});
