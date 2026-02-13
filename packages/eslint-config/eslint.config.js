/* @ts-nocheck */

// eslint-disable-next-line antfu/no-import-dist
import eslintConfig from './dist/index.mjs'

export default eslintConfig({
  typescript: true,
  unocss: true,
  tailwindcss: true,
  html: true,
  formatters: true,
  vue: true,
  svelte: true,
  react: true,
  angular: true,
  nextjs: true,
  astro: true,
  solid: true,
  pnpm: true,
})
