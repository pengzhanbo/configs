import type { PresetItem } from '@pengzhanbo/eslint-config'
import { solid } from './solid'

export const solidPreset: PresetItem = (options) => {
  return [solid({
    overrides: options.overrides.solid,
    typescript: !!options.typescript,
  })]
}
