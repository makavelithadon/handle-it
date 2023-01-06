import { addEventListener } from '.';
import { mockAddEventListener } from '../../../../test-utils';

describe('addEventListener', () => {
  test(`should call addEventListener
      - with element, event and callback parameters
      - then call original provided element addEventListener method
      - with right inputs`, () => {
    const mockClickCallback = jest.fn();
    const mockResizeCallback = jest.fn();

    const button = document.createElement('button');

    mockAddEventListener(button);
    mockAddEventListener(window);

    addEventListener(button, 'click', mockClickCallback);

    expect(button.addEventListener).toHaveBeenNthCalledWith(
      1,
      'click',
      mockClickCallback,
      false
    );

    addEventListener(window, 'resize', mockResizeCallback);

    expect(window.addEventListener).toHaveBeenNthCalledWith(
      1,
      'resize',
      mockResizeCallback,
      false
    );
  });
});
