import { createConfig } from '@pengzhanbo/eslint-config'
import type { OptionsOverrides } from '@pengzhanbo/eslint-config'
import { nextPreset, reactPreset } from './preset'

declare module '@pengzhanbo/eslint-config' {
  export interface OptionsFrameworkExtract {
    react?: OptionsOverrides
    nextjs?: OptionsOverrides
  }
}

export const eslintReactConfig = createConfig([reactPreset, nextPreset])
