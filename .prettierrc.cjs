// @ts-check

/**
 * @see https://prettier.io/docs/en/options.html
 * @see https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4
 *
 * @type {import('prettier').Options}
 */
const config = {
  endOfLine: 'lf',
  semi: true,

  // https://github.com/prettier/prettier/issues/68
  trailingComma: 'es5',

  // https://github.com/prettier/prettier/issues/6929
  arrowParens: 'avoid',

  proseWrap: 'preserve',

  // https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4#strings--quotes
  singleQuote: true,

  // https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4#whitespace--max-len
  printWidth: 80,

  // https://github.com/prettier/plugin-xml/blob/v0.12.0/README.md#configuration
  // FIXME https://github.com/prettier/prettier/issues/5322
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  htmlWhitespaceSensitivity: 'ignore',
};

module.exports = config;
