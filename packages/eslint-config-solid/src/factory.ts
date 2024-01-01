import { createConfig } from '@pengzhanbo/eslint-config'
import type { OptionsOverrides } from '@pengzhanbo/eslint-config'
import { solidPreset } from './preset'

declare module '@pengzhanbo/eslint-config' {
  export interface OptionsFrameworkExtract {
    solid?: OptionsOverrides
  }
}

export const eslintSolidConfig = createConfig(solidPreset)
