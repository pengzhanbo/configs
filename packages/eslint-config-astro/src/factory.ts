import { createConfig } from '@pengzhanbo/eslint-config'
import type { OptionsOverrides } from '@pengzhanbo/eslint-config'
import { astroPreset } from './preset'

declare module '@pengzhanbo/eslint-config' {
  export interface OptionsFrameworkExtract {
    astro?: OptionsOverrides
  }
}

export const eslintAstroConfig = createConfig(astroPreset)
