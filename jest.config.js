// @ts-check

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src/lib'],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/lib/**/*'],

  // Ignore this paths to being transformed by Jest
  transformIgnorePatterns: ['/node_modules/deep-freeze-es6/'],
};
