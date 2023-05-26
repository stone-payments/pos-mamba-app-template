/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-underscore-dangle */
import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import webpackConfig from './packages/webpack/config.test';

process.env.TEST = JSON.stringify(true);
process.env.DEBUG = JSON.stringify('cypress:webpack');

function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  on('file:preprocessor', webpackPreprocessor({ webpackOptions: webpackConfig }));
  codeCoverageTask(on, config);
  return config;
}

export default defineConfig({
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'reports/tests-results.e2e.xml',
    testsuitesTitle: false,
  },
  e2e: {
    supportFile: 'e2e/support/index.ts',
    specPattern: 'e2e/**/*.cy.ts',
    baseUrl: 'http://localhost:8080',
    videoUploadOnPasses: false,
    fixturesFolder: false,
    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    setupNodeEvents,
  },
});
