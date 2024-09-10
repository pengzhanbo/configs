import {
  eslintFlatConfig as basicConfig,
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
} from '@pengzhanbo/eslint-config'

export function vueEslintFlatConfig(
  options: EslintConfigOptions,
  ...userConfigs: UserConfig[]
): EslintConfigReturn {
  return basicConfig({
    vue: true,
    ...options,
  }, ...userConfigs)
}

export * from '@pengzhanbo/eslint-config'

export default vueEslintFlatConfig
