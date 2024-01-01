import type { PresetItem } from '@pengzhanbo/eslint-config'
import { getOverrides } from '@pengzhanbo/eslint-config'
import { svelte } from './svelte'

export const sveltePreset: PresetItem = (options) => {
  return [svelte({
    overrides: getOverrides(options, 'svelte'),
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
