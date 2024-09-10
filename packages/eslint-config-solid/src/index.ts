import {
  eslintFlatConfig as basicConfig,
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
} from '@pengzhanbo/eslint-config'

export function solidEslintFlatConfig(
  options: EslintConfigOptions,
  ...userConfigs: UserConfig[]
): EslintConfigReturn {
  return basicConfig({
    solid: true,
    ...options,
  }, ...userConfigs)
}

export * from '@pengzhanbo/eslint-config'

export default solidEslintFlatConfig
