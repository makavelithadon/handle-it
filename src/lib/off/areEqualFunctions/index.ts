import { CallBack } from '../../types';

// eslint-disable-next-line @typescript-eslint/ban-types
function areEqualFunctions(fn1: CallBack, fn2: CallBack) {
  return fn1 === fn2 || fn1.toString() === fn2.toString();
}

export { areEqualFunctions };
