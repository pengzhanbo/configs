/* @ts-nocheck */

// eslint-disable-next-line antfu/no-import-dist
import eslintConfig from './dist/index.js'

export default eslintConfig({
  angular: true,
  astro: true,
  formatters: true,
  gitignore: true,
  imports: true,
  jsdoc: true,
  jsonc: true,
  jsx: {
    a11y: true,
  },
  markdown: true,
  nextjs: true,
  node: true,
  perfectionist: true,
  pnpm: true,
  react: true,
  regexp: true,
  solid: true,
  stylistic: {
    experimental: true,
  },
  svelte: true,
  test: true,
  toml: true,
  typescript: {
    erasableOnly: true,
    tsconfigPath: 'tsconfig.json',
  },
  unicorn: true,
  unocss: true,
  vue: {
    a11y: true,
  },
  yaml: true,
})
