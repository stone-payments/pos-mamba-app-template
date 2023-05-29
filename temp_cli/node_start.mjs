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

const webpackConfigPath = getWebpackConfigPath('dev');
const tsNodeProjectPath = getWebpackPaths('tsconfig.node.json');

console.log('====================================');
console.log(tsNodeProjectPath);
console.log('====================================');

if (!existsSync(tsNodeProjectPath)) {
  throw new Error('ts config for webpack not found');
}

// TODO for future
const platform = 'GENERIC';
const debug = 1;

const cmd = [
  'cross-env',

  /** If development flag has a numeric value */
  Number.isInteger(debug) && `DEBUG_LVL=${debug}`,
  `PLATFORM=${platform}`,
  `TS_NODE_PROJECT=${tsNodeProjectPath}`,
  // 'TS_NODE_DEBUG=true',
  'APP_ENV=browser',
  'NODE_ENV="development"',
  'NODE_OPTIONS="--trace-deprecation --no-warnings"',
  `webpack server --env PLATFORM=${platform} --config "${webpackConfigPath}"`,
]
  .filter(Boolean)
  .join(' ');
shell(cmd);
