import type { EslintConfigOptions, EslintConfigReturn, UserConfig } from '@pengzhanbo/eslint-config'
import { eslintFlatConfig as basicConfig } from '@pengzhanbo/eslint-config'

export function astroEslintFlatConfig(
  options: EslintConfigOptions,
  ...userConfigs: UserConfig[]
): EslintConfigReturn {
  return basicConfig({
    astro: true,
    ...options,
  }, ...userConfigs)
}

export * from '@pengzhanbo/eslint-config'

export default astroEslintFlatConfig
