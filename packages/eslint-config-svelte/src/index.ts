import type { EslintConfigOptions, EslintConfigReturn, UserConfig } from '@pengzhanbo/eslint-config'
import { eslintFlatConfig as basicConfig } from '@pengzhanbo/eslint-config'

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
