import type { PresetItem } from '@pengzhanbo/eslint-config'
import { react } from './react'

export const reactPreset: PresetItem = (options) => {
  return [react({
    overrides: options.overrides.react,
    typescript: !!options.typescript,
  })]
}
