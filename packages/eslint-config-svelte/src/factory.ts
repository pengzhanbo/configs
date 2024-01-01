import { createConfig } from '@pengzhanbo/eslint-config'
import type { OptionsOverrides } from '@pengzhanbo/eslint-config'
import { sveltePreset } from './preset'

declare module '@pengzhanbo/eslint-config' {
  export interface OptionsFrameworkExtract {
    svelte?: OptionsOverrides
  }
}

export const eslintSvelteConfig = createConfig(sveltePreset)
