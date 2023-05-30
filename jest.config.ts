/// <reference types="@mamba/testing" />
import mamba from '@mamba/testing/jest.config.cjs';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  ...mamba,
};

export default config;
