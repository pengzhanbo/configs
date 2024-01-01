import type { PresetItem } from '@pengzhanbo/eslint-config'
import { resolveSubOptions } from '@pengzhanbo/eslint-config'
import { vue } from './vue'

export const vuePreset: PresetItem = (options) => {
  return [vue({
    ...resolveSubOptions(options, 'vue'),
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
