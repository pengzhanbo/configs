import { GLOB_SVELTE, interopDefault } from '@pengzhanbo/eslint-config'
import type { FlatConfigItem, OptionsFiles, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '@pengzhanbo/eslint-config'

export async function svelte(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_SVELTE],
    overrides = {},
    stylistic = true,
  } = options

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [pluginSvelte, parserSvelte] = await Promise.all([
    interopDefault(import('eslint-plugin-svelte')),
    interopDefault(import('svelte-eslint-parser')),
  ] as const)

  return [
    {
      name: 'config:svelte:setup',
      plugins: {
        svelte: pluginSvelte,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserSvelte,
        parserOptions: {
          extraFileExtensions: ['.svelte'],
          parser: options.typescript
            ? await interopDefault(import('@typescript-eslint/parser')) as any
            : null,
          sourceType: 'module',
        },
      },
      name: 'config:svelte:rules',
      processor: pluginSvelte.processors['.svelte'],
      rules: {
        ...pluginSvelte.configs.base.overrides[0].rules as any,
        ...pluginSvelte.configs.all.rules as any,
        ...pluginSvelte.configs.recommended.rules as any,

        'svelte/block-lang': [
          'error',
          {
            script: ['ts', null],
            style: ['scss', 'less', 'stylus', 'postcss', null],
          },
        ],

        'svelte/indent': ['error', indent],
        'svelte/html-quotes': ['error', 'double'],
        'svelte/max-attributes-per-line': 'off',
        'svelte/no-inline-styles': 'off',

        ...overrides,
      },
    },
  ]
}
