import {
  eslintFlatConfig as basicConfig,
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
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
