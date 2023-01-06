import { CallBack } from '../../types';

/* eslint-enable no-unused-vars */
const isRegisteredEvent = (
  maybeRegisteredEvent: CallBack[] | undefined
): maybeRegisteredEvent is CallBack[] => {
  return (
    Array.isArray(maybeRegisteredEvent) &&
    maybeRegisteredEvent.every(n => typeof n === 'function')
  );
};

export { isRegisteredEvent };
