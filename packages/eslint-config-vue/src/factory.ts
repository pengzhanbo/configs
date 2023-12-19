import { createConfig } from '@pengzhanbo/eslint-config'
import type { OptionsVue } from './types'
import { vuePreset } from './preset'

declare module '@pengzhanbo/eslint-config' {
  export interface OptionsFrameworkExtract {
    vue?: OptionsVue
  }
}

export const eslintVueConfig = createConfig(vuePreset)
