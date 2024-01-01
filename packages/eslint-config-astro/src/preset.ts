import type { PresetItem } from '@pengzhanbo/eslint-config'
import { getOverrides } from '@pengzhanbo/eslint-config'
import { astro } from './astro'

export const astroPreset: PresetItem = (options) => {
  return [astro({
    overrides: getOverrides(options, 'astro'),
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
