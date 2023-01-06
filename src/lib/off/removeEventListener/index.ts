import { CallBack, Elt, Evt } from '../../types';

function removeEventListener(element: Elt, event: Evt, callback: CallBack) {
  element.removeEventListener(event, callback);

  return callback;
}

export { removeEventListener };
