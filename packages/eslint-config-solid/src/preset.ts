import type { PresetItem } from '@pengzhanbo/eslint-config'
import { getOverrides } from '@pengzhanbo/eslint-config'
import { solid } from './solid'

export const solidPreset: PresetItem = (options) => {
  return [solid({
    overrides: getOverrides(options, 'solid'),
    typescript: !!options.typescript,
  })]
}
