import type { Awaitable, FlatConfigItem, OptionsConfig, PresetItem, UserConfigItem } from './types'
import { combine } from './utils'
import { defaultPreset } from './preset'
import { resolveOptions } from './resolvedOptions'

const flatConfigProps: (keyof FlatConfigItem)[] = [
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
]

export function eslintFlatConfig(
  options: OptionsConfig & FlatConfigItem = {},
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> {
  const { preset = [], ...resolvedOptions } = resolveOptions(options)

  const presetList = Array.from(new Set([defaultPreset, ...preset]))

  const configs: Awaitable<FlatConfigItem[]>[] = []

  for (const preset of presetList)
    configs.push(...preset(resolvedOptions))

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any
    return acc
  }, {} as FlatConfigItem)
  if (Object.keys(fusedConfig).length)
    configs.push([fusedConfig])

  const merged = combine(
    ...configs,
    ...userConfigs,
  )

  return merged
}

export function createConfig(preset: PresetItem | PresetItem[]) {
  function eslintConfig(
    options: any = {},
    ...userConfigs: any[]
  ) {
    const userPreset = options.preset || []
    const presetList = Array.isArray(preset) ? preset : [preset]
    presetList.push(...userPreset)
    options.preset = presetList
    return eslintFlatConfig(options, ...userConfigs)
  }

  return eslintConfig as typeof eslintFlatConfig
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
) {
  const sub = resolveSubOptions(options, key)
  return {
    ...(options.overrides as any)?.[key],
    ...'overrides' in sub
      ? (sub.overrides || {})
      : {},
  }
}
