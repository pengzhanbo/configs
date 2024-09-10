import {
  eslintFlatConfig as basicConfig,
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
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
