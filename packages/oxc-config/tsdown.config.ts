import { defineConfig, type UserConfig } from 'tsdown'

export default defineConfig({
  entry: {
    oxfmt: './src/oxfmt.ts',
    oxlint: './src/oxlint/index.ts',
  },
  clean: true,
  outDir: 'dist',
  dts: true,
  format: 'esm',
  sourcemap: false,
  fixedExtension: false,
}) as UserConfig
