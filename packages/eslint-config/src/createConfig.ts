import { eslintFlatConfig } from './factory'
import type {
  Awaitable,
  FlatConfigItem,
  OptionsConfig,
  PresetItem,
  UserConfigItem,
} from './types'

export interface EslintFlatConfigFunction {
  (
    options: OptionsConfig & FlatConfigItem,
    ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
  ): Promise<UserConfigItem[]>
}

export function createConfig(
  preset: PresetItem | PresetItem[],
): EslintFlatConfigFunction {
  return function eslintFlatConfig(
    options = {},
    ...userConfigs
  ) {
    const userPreset = options.preset || []
    const presetList = Array.isArray(preset) ? preset : [preset]
    presetList.push(...userPreset)
    options.preset = presetList
    return eslintFlatConfig(options, ...userConfigs)
  }
}
