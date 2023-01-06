// @ts-check

/**
 * Your Attention please !
 * plugin:prettier/recommended should be the last extension as recommended by documentation.
 * This will turn off eslint rules conflicting with prettier.
 *
 * @see https://github.com/prettier/eslint-plugin-prettier#user-content-recommended-configuration
 *
 * @type {import('eslint').ESLint.ConfigData}
 */

const config = {
  extends: [
    // /!\ Order matters
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  ignorePatterns: ['dist', 'build', 'node_modules/'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },

  env: {
    browser: true,
    jest: true,
    es6: true,
  },

  rules: {
    'no-plusplus': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off', // In strict mode, (almost?) all return types are automatically infered.

    'import/extensions': 'off', // We don't want to specify `.ts` on all imports.
    'import/no-default-export': 'error', // We try to avoid default exports, to improve searchability and refactoring.
    'import/no-unresolved': 'off', // Bug? tsc check it anyway.
    'import/prefer-default-export': 'off', // We like named export as well.

    curly: ['error', 'all'],
    'newline-before-return': 'error',
    'prettier/prettier': 'off',
    'no-unused-vars': 'warn',
  },
};

module.exports = config;
