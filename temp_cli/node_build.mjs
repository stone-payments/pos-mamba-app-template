#!/usr/bin/env node

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import shell from './shell.mjs';

const workingDirectory = process.cwd();
const getWebpackPaths = (...paths) =>
  resolve(workingDirectory, 'node_modules', '@mamba', 'webpack', ...paths);
const getWebpackConfigPath = (id) => getWebpackPaths(`config.${id}.ts`);

const webpackConfigPath = getWebpackConfigPath('prod');
const tsNodeProjectPath = getWebpackPaths('tsconfig.node.json');

if (!existsSync(tsNodeProjectPath)) {
  throw new Error('ts config for webpack not found');
}

if (existsSync(resolve(workingDirectory, 'dist'))) {
  shell('rm -rf dist/*');
}

// TODO for future
const platform = 'GENERIC';

const cmd = [
  'cross-env',
  `PLATFORM=${platform}`,
  `TS_NODE_PROJECT=${tsNodeProjectPath}`,
  'APP_ENV=POS',
  'NODE_ENV="production"',
  'NODE_OPTIONS="--trace-deprecation --no-warnings"',
  `webpack --env PLATFORM=${platform} --config "${webpackConfigPath}"`,
]
  .filter(Boolean)
  .join(' ');
shell(cmd);
