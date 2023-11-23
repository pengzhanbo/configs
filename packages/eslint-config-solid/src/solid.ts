import { GLOB_JSX, GLOB_TSX, interopDefault } from '@pengzhanbo/eslint-config'
import type { FlatConfigItem, OptionsFiles, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '@pengzhanbo/eslint-config'

export async function solid(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_JSX, GLOB_TSX],
    overrides = {},
    typescript = true,
  } = options

  const pluginSolid = await interopDefault(import('eslint-plugin-solid'))

  const rules = typescript ? pluginSolid.configs.typescript.rules : pluginSolid.configs.recommended.rules

  return [
    {
      name: 'config:solid:setup',
      plugins: {
        solid: pluginSolid,
      },
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'config:solid:rules',
      rules: {
        ...rules,

        'solid/components-return-once': 'error',
        'solid/style-prop': 'error',

        ...overrides,
      },
    },
  ]
}
