import type { FlatConfigItem, OptionsFiles, OptionsOverrides, OptionsStylistic } from '../types'
import { GLOB_TOML } from '../globs'
import { interopDefault } from '../utils'

export async function toml(
  options: OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_TOML],
    overrides = {},
    stylistic = true,
  } = options

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [
    pluginToml,
    parserToml,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-toml')),
    interopDefault(import('toml-eslint-parser')),
  ] as const)

  return [
    {
      name: 'config:toml:setup',
      plugins: {
        toml: pluginToml,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserToml,
      },
      name: 'config:toml:rules',
      rules: {
        ...pluginToml.configs.standard.rules as any,
        ...pluginToml.configs.recommended.rules as any,

        'style/spaced-comment': 'off',

        ...stylistic
          ? {
              'toml/indent': ['error', indent === 'tab' ? 2 : indent],
            }
          : {},

        ...overrides,
      },
    },
  ]
}
