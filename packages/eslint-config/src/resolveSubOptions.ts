import type { FlatConfigItem, OptionsConfig } from './types'

type ResolvedNoNullableOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedNoNullableOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): FlatConfigItem['rules'] {
  const sub = resolveSubOptions(options, key)
  return 'overrides' in sub ? sub.overrides : {} || {}
}
