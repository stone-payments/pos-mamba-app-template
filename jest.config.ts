import mamba from '@mamba/testing/jest.config';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  ...mamba,
};

export default config;
