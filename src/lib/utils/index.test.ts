import { logger, warnIf, excludeKeyFromObject } from '.';

afterEach(() => {
  jest.clearAllMocks();
});

describe('logger', () => {
  test(`should call console.<method>
      - when input method name is provided
      - and input message is provided
      - and call original console.<method> with input message`, () => {
    const logSpy = jest.spyOn(console, 'log');
    const warnSpy = jest.spyOn(console, 'warn');
    const infoSpy = jest.spyOn(console, 'info');
    const errorSpy = jest.spyOn(console, 'error');

    logger('Hello World');

    expect(logSpy).toHaveBeenNthCalledWith(1, 'Hello World');

    logger('Hello World', 'log');
    logger('Hello World', 'warn');
    logger('Hello World', 'info');
    logger('Hello World', 'error');

    expect(logSpy).toHaveBeenNthCalledWith(2, 'Hello World');
    expect(warnSpy).toHaveBeenNthCalledWith(1, 'Hello World');
    expect(infoSpy).toHaveBeenNthCalledWith(1, 'Hello World');
    expect(errorSpy).toHaveBeenNthCalledWith(1, 'Hello World');
  });
});

describe('warnIf', () => {
  test(`should call console.warn method
  - with provided input message
  - when assertion input is truthy`, () => {
    const warnSpy = jest.spyOn(console, 'warn');

    warnIf(false, 'Something went wrong');

    expect(warnSpy).not.toHaveBeenCalled();

    warnIf(true, 'Something went wrong');

    expect(warnSpy).toHaveBeenNthCalledWith(1, 'Something went wrong');
  });
});

describe('excludeKeyFromObject', () => {
  test(`should return transformed provided input object
      - wihtout specified input key to exclude from it`, () => {
    const obj = { a: 1 };

    expect(excludeKeyFromObject(obj, 'b' as keyof typeof obj)).toStrictEqual({
      a: 1,
    });

    expect(excludeKeyFromObject({ ...obj, b: 2 }, 'b')).toStrictEqual(obj);
  });
});
