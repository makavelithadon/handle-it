import { fireEvent } from '@testing-library/dom';
import { on, off, debug } from '.';

const mockOnClick = jest.fn();
const mockOnClick2 = jest.fn();
const mockOnHover = jest.fn();
const mockOnWindowResize = jest.fn();

const button = document.createElement('button');

describe('on', () => {
  test(`should subscribe to given event on given element by providing callback to trigger`, () => {
    on(button, 'click', mockOnClick);

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        isTrusted: false,
      })
    );

    on(window, 'resize', mockOnWindowResize);

    fireEvent.resize(window);

    expect(mockOnWindowResize).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        isTrusted: false,
      })
    );

    // Add another click handler on button Element
    on(button, 'click', mockOnClick2);

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        isTrusted: false,
      })
    );

    expect(mockOnClick2).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        isTrusted: false,
      })
    );
  });
});

describe('off', () => {
  test(`should unsubscribe to events from element`, () => {
    // Specifically remove first event handler for 'click' event on button Element
    off(button, 'click', mockOnClick);

    fireEvent.click(button);

    // Check that the removed callback will be triggered anymore
    expect(mockOnClick).not.toHaveBeenCalledTimes(3);

    expect(mockOnClick2).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        isTrusted: false,
      })
    );

    off(button, 'click');

    fireEvent.click(button);

    expect(mockOnClick2).not.toHaveBeenCalledTimes(3);
  });
});

describe('debug', () => {
  test(`should return an up-to-date mirrored copy of events Map`, () => {
    // button has already been removed from the events Map so we only need to unsubscribe/remove for Window
    off(window);

    expect(debug()).toHaveProperty('size', 0);

    on(button, 'click', mockOnClick);
    on(button, 'click', mockOnClick2);

    expect(debug()).toHaveProperty('size', 1);
    expect(debug().get(button)).toStrictEqual({
      click: [mockOnClick, mockOnClick2],
    });

    on(button, 'mouseover', mockOnHover);

    expect(debug()).toHaveProperty('size', 1);
    expect(debug().get(button)).toStrictEqual({
      click: [mockOnClick, mockOnClick2],
      mouseover: [mockOnHover],
    });

    on(window, 'resize', mockOnWindowResize);

    expect(debug()).toHaveProperty('size', 2);
    expect(debug().get(window)).toStrictEqual({
      resize: [mockOnWindowResize],
    });

    off(window, 'resize');

    expect(debug()).toHaveProperty('size', 1);
    expect(debug().get(window)).not.toBeDefined();

    off(button, 'mouseover');

    expect(debug()).toHaveProperty('size', 1);
    expect(debug().get(button)).toStrictEqual({
      click: [mockOnClick, mockOnClick2],
    });

    off(button, 'click', mockOnClick);

    expect(debug()).toHaveProperty('size', 1);
    expect(debug().get(button)).toStrictEqual({
      click: [mockOnClick2],
    });

    off(button);

    expect(debug()).toHaveProperty('size', 0);
  });
});
