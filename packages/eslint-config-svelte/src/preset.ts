import type { PresetItem } from '@pengzhanbo/eslint-config'
import { svelte } from './svelte'

export const sveltePreset: PresetItem = (options) => {
  return [svelte({
    overrides: options.overrides.astro,
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
