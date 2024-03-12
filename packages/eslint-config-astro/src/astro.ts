import { GLOB_ASTRO, interopDefault } from '@pengzhanbo/eslint-config'
import type { FlatConfigItem, OptionsFiles, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '@pengzhanbo/eslint-config'

export async function astro(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_ASTRO],
    overrides = {},
    stylistic = true,
  } = options

  const [pluginAstro, parserAstro, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-astro')),
    interopDefault(import('astro-eslint-parser')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      name: 'config:astro:setup',
      plugins: {
        astro: pluginAstro,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserAstro,
        parserOptions: {
          extraFileExtensions: ['.astro'],
          parser: parserTs as any,
        },
      },
      name: 'config:astro:rules',
      rules: {
        'astro/no-set-html-directive': 'off',
        'astro/semi': 'off',

        ...stylistic
          ? {
              'style/indent': 'off',
              'style/jsx-closing-tag-location': 'off',
              'style/jsx-indent': 'off',
              'style/jsx-one-expression-per-line': 'off',
              'style/no-multiple-empty-lines': 'off',
            }
          : {},

        ...overrides,
      },
    },
  ]
}
