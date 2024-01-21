import type { PresetItem } from '@pengzhanbo/eslint-config'
import { getOverrides, resolveSubOptions } from '@pengzhanbo/eslint-config'
import { vue } from './vue'

export const vuePreset: PresetItem = (options) => {
  return [vue({
    ...resolveSubOptions(options, 'vue'),
    overrides: getOverrides(options, 'vue'),
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
