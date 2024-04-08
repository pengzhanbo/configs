import {
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
  eslintFlatConfig as basicConfig,
} from '@pengzhanbo/eslint-config'

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
