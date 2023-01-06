import type { Elt } from '../src/lib/types';

const mockAddEventListener = (element: Elt) => {
  const originalAddEventListener = element.addEventListener;

  // eslint-disable-next-line no-shadow, no-param-reassign
  element.addEventListener = jest.fn(function addEventListener(
    ...args: Parameters<typeof element['addEventListener']>
  ) {
    return originalAddEventListener.apply(element, args);
  });
};

const mockRemoveEventListener = (element: Elt) => {
  const originalRemoveEventListener = element.removeEventListener;

  // eslint-disable-next-line no-shadow, no-param-reassign
  element.removeEventListener = jest.fn(function removeEventListener(
    ...args: Parameters<typeof element['removeEventListener']>
  ) {
    return originalRemoveEventListener.apply(element, args);
  });
};

export { mockAddEventListener, mockRemoveEventListener };
