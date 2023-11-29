import { createConfig } from '@pengzhanbo/eslint-config'
import { nextPreset, reactPreset } from './preset'

export const eslintReactConfig = createConfig([reactPreset, nextPreset])
