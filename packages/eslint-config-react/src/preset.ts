import type { PresetItem } from '@pengzhanbo/eslint-config'
import { getOverrides } from '@pengzhanbo/eslint-config'
import { react } from './react'
import { next } from './next'

export const reactPreset: PresetItem = (options) => {
  return [react({
    overrides: getOverrides(options, 'react'),
    typescript: !!options.typescript,
  })]
}

export const nextPreset: PresetItem = (options) => {
  return [next({
    overrides: getOverrides(options, 'nextjs'),
  })]
}
