const logger = (
  message: string,
  level: 'log' | 'warn' | 'info' | 'error' = 'log'
) => {
  // eslint-disable-next-line no-console
  console[level](message);
};

const warnIf = (assertion: boolean, message: string) => {
  if (assertion) {
    logger(message, 'warn');
  }
};

const excludeKeyFromObject = <
  T extends Record<string, unknown>,
  U extends keyof T
>(
  object: T,
  excludedKey: U
): Omit<T, U> => {
  return Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(key !== excludedKey && { [key]: value }),
    }),
    {} as Omit<T, U>
  );
};

export { excludeKeyFromObject, logger, warnIf };
