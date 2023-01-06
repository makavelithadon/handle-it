import { CallBack } from '../../types';

const isRegisteredCallback = (
  maybeRegisteredCallback: CallBack | undefined
): maybeRegisteredCallback is CallBack => {
  return typeof maybeRegisteredCallback === 'function';
};

export { isRegisteredCallback };
