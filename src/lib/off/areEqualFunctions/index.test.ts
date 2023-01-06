import { areEqualFunctions } from '.';

describe('areEqualFunctions', () => {
  test(`should call areEqualFunctions
      - with 2 functions as parameters
      - and return true if functions arre equal`, () => {
    function sayHelloFunction() {
      // eslint-disable-next-line no-console
      console.log('Hello World');
    }

    // Test two functions with reference equality
    expect(areEqualFunctions(sayHelloFunction, sayHelloFunction)).toBe(true);

    // Test two functions with inline equality then
    expect(
      areEqualFunctions(
        () => 2,
        () => 2
      )
    ).toBe(true);

    // Test not equal functions
    expect(
      areEqualFunctions(
        () => 1,
        () => 2
      )
    ).toBe(false);
  });
});
