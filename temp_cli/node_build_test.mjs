#!/usr/bin/env node

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import shell from './shell.mjs';

const workingDirectory = process.cwd();
const getWebpackPaths = (...paths) => resolve(workingDirectory, 'packages', 'webpack', ...paths);
const getWebpackConfigPath = (id) => getWebpackPaths(`config.${id}.ts`);

const webpackConfigPath = getWebpackConfigPath('test');
const tsNodeProjectPath = resolve(workingDirectory, 'e2e/tsconfig.json');

if (!existsSync(tsNodeProjectPath)) {
  throw new Error('ts config for test webpack not found');
}

const cmd = [
  'cross-env',
  `TS_NODE_PROJECT=${tsNodeProjectPath}`,
  'TEST=true',
  'NODE_ENV="development"',
  'NODE_OPTIONS="--trace-deprecation --no-warnings"',
  `webpack --config "${webpackConfigPath}"`,
]
  .filter(Boolean)
  .join(' ');
shell(cmd);
