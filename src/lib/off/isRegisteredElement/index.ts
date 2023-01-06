import { EventTypeHandlersMap } from '../../types';

const isRegisteredElement = (
  maybeRegisteredElement: EventTypeHandlersMap | undefined
): maybeRegisteredElement is EventTypeHandlersMap => {
  return (
    Object.prototype.toString.call(maybeRegisteredElement) === '[object Object]'
  );
};

export { isRegisteredElement };
