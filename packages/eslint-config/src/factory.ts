import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'
import { combine } from './utils'
import { defaultPreset } from './preset'
import { resolveOptions } from './resolvedOptions'

const flatConfigProps: (keyof FlatConfigItem)[] = [
  'name',
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
