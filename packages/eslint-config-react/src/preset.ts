import type { PresetItem } from '@pengzhanbo/eslint-config'
import { react } from './react'
import { next } from './next'

export const reactPreset: PresetItem = (options) => {
  return [react({
    overrides: options.overrides.react,
    typescript: !!options.typescript,
  })]
}

export const nextPreset: PresetItem = (options) => {
  return [next({
    overrides: options.overrides.nextjs,
  })]
}
