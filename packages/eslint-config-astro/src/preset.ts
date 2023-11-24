import type { PresetItem } from '@pengzhanbo/eslint-config'
import { astro } from './astro'

export const astroPreset: PresetItem = (options) => {
  return [astro({
    overrides: options.overrides.astro,
    stylistic: options.stylistic,
    typescript: !!options.typescript,
  })]
}
