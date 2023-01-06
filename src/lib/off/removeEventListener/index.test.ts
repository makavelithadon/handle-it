import { removeEventListener } from '.';
import { mockRemoveEventListener } from '../../../../test-utils';

describe('removeEventListener', () => {
  test(`should call removeEventListener
        - with element, event and callback parameters
        - then call original provided element removeEventListener method
        - with right inputs`, () => {
    const mockClickCallback = jest.fn();
    const mockResizeCallback = jest.fn();

    const button = document.createElement('button');

    mockRemoveEventListener(button);
    mockRemoveEventListener(window);

    removeEventListener(button, 'click', mockClickCallback);

    expect(button.removeEventListener).toHaveBeenNthCalledWith(
      1,
      'click',
      mockClickCallback
    );

    removeEventListener(window, 'resize', mockResizeCallback);

    expect(window.removeEventListener).toHaveBeenNthCalledWith(
      1,
      'resize',
      mockResizeCallback
    );
  });
});
