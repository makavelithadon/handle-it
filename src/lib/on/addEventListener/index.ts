import { CallBack, Elt, Evt } from '../../types';

function addEventListener(
  element: Elt,
  event: Evt,
  callback: CallBack
): CallBack {
  element.addEventListener(event, callback, false);

  return callback;
}

export { addEventListener };
