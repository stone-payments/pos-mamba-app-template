import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  rootDir: process.cwd(),
  roots: ['src', 'tests'],
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(html?|svelte)$': ['svelte-jester', { preprocess: true }],
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@c(.*)$': '<rootDir>/src/components$1',
    '^@(\\/.*)$': '<rootDir>/src$1',
  },
  testPathIgnorePatterns: ['./node_modules/', '/e2e/'],
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  bail: false,
  verbose: true,
  globals: {
    __NODE_ENV__: 'test',
    __APP_ENV__: 'browser',
    __PROD__: false,
    __TEST__: true,
    __DEV__: true,
    __POS__: false,
    __BROWSER__: true,
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/tests/**/*.ts',
    '<rootDir>/src/**/?(*.)+(ts|svelte)',
    '!<rootDir>/src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/packages/**/*',
    '!*.d.ts',
  ],
  coverageReporters: [/* 'clover', */ 'lcov', 'cobertura'],
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports', outputName: 'tests-results.unit.xml' }],
  ],
  coverageDirectory: '<rootDir>/reports',
  coverageThreshold: {
    global: {},
    '**/*.svelte': {
      branches: 0,
    },
  },
};

export default config;
