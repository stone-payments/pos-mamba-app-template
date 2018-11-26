const { resolve } = require('path');
const getSvelteModuleMaps = require('@mamba/configs/jest/getSvelteModuleMaps.js');

module.exports = {
  rootDir: process.cwd(),
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{html,htmlx,svelte}',
    '!**/node_modules/**',
    '!<rootDir>/tests/setup/**/*.html',
  ],
  testMatch: ['**/*.test.js'],
  setupFiles: [
    '<rootDir>/tests/setup/simulator.js',
    '<rootDir>/tests/setup/globals.js',
  ],
  transformIgnorePatterns: ['node_modules/(?!(@mamba)|(.+\\.html)/)'],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|ttf)$':
      '<rootDir>/tests/jest/__mocks__/fileMock.js',
    /**
     * act as a resolver for the "svelte" field of a component package.json.,
     * Pass directories which contains used "svelte" packages
     */
    ...getSvelteModuleMaps(resolve(__dirname, 'node_modules', '@mamba')),
  },
  transform: {
    '^.+\\.js$': '<rootDir>/tests/setup/transformers/babel.js',
    '^.+\\.(htmlx?|svelte)$': '<rootDir>/tests/setup/transformers/svelte.js',
  },
  globals: {
    __NODE_ENV__: 'test',
    __APP_ENV__: 'browser',
    __PROD__: false,
    __TEST__: true,
    __DEV__: true,
    __DEBUG_LVL__: null,
    __POS__: false,
    __SIMULATOR__: true,
    __BROWSER__: true,
  },
};
