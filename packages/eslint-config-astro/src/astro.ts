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

  const {
    semi = false,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [pluginAstro, parserAstro] = await Promise.all([
    interopDefault(import('eslint-plugin-astro')),
    interopDefault(import('astro-eslint-parser')),
  ] as const)

  return [
    {
      name: 'config:astro:setup',
      plugins: {
        astro: pluginAstro,
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: [`${GLOB_ASTRO}/*.js`],
      name: 'config:astro:script',
      languageOptions: {
        parser: await interopDefault(import('@typescript-eslint/parser')) as any,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserAstro,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.astro'],
          parser: options.typescript
            ? await interopDefault(import('@typescript-eslint/parser')) as any
            : null,
          sourceType: 'module',
        },
      },
      name: 'config:astro:rules',
      processor: pluginAstro.processors['.astro'],
      rules: {
        ...pluginAstro.configs.all.rules as any,
        ...pluginAstro.configs.recommended.rules as any,

        'astro/semi': ['error', semi ? 'always' : 'never'],

        ...overrides,
      },
    },
  ]
}
