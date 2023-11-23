import type { PresetItem } from '@pengzhanbo/eslint-config'
import { vue } from './vue'

export const vuePreset: PresetItem = (options) => {
  return [vue({
    overrides: options.overrides.vue,
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
