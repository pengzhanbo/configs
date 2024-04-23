import {
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
  eslintFlatConfig as basicConfig,
} from '@pengzhanbo/eslint-config'

export function reactEslintFlatConfig(
  options: EslintConfigOptions,
  ...userConfigs: UserConfig[]
): EslintConfigReturn {
  return basicConfig({
    react: true,
    ...options,
  }, ...userConfigs)
}

export * from '@pengzhanbo/eslint-config'

export default reactEslintFlatConfig
