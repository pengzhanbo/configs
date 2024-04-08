import {
  type EslintConfigOptions,
  type EslintConfigReturn,
  type UserConfig,
  eslintFlatConfig as basicConfig,
} from '@pengzhanbo/eslint-config'
import { isPackageExists } from 'local-pkg'

export function reactEslintFlatConfig(
  options: EslintConfigOptions,
  ...userConfigs: UserConfig[]
): EslintConfigReturn {
  return basicConfig({
    react: true,
    nextjs: isPackageExists('next'),
    ...options,
  }, ...userConfigs)
}

export * from '@pengzhanbo/eslint-config'

export default reactEslintFlatConfig
