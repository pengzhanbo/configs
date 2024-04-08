import {
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
  eslintFlatConfig as basicConfig,
} from '@pengzhanbo/eslint-config'

export function svelteEslintFlatConfig(
  options: EslintConfigOptions,
  ...userConfigs: UserConfig[]
): EslintConfigReturn {
  return basicConfig({
    svelte: true,
    ...options,
  }, ...userConfigs)
}

export * from '@pengzhanbo/eslint-config'

export default svelteEslintFlatConfig
