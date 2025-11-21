import { defineConfig, globalIgnores } from 'eslint/config';
import ts from 'eslint-config-cheminfo-typescript/base';
import unicorn from 'eslint-config-cheminfo-typescript/unicorn';

export default defineConfig(
  globalIgnores(['coverage', 'dist', 'lib']),
  ts,
  unicorn,
);
