import type { FlatConfigItem, OptionsFiles, OptionsOverrides, OptionsStylistic } from '../types'
import { GLOB_HTML } from '../globs'
import { interopDefault } from '../utils'

export async function html(
  options: OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_HTML],
    overrides = {},
    stylistic = true,
  } = options

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [
    pluginHtml,
    parserHtml,
  ] = await Promise.all([
    interopDefault(import('@html-eslint/eslint-plugin')),
    interopDefault(import('@html-eslint/parser')),
  ] as const)

  return [
    {
      name: 'config:html:setup',
      plugins: {
        html: pluginHtml,
      },
    },
    {
      files,
      name: 'config:html:rules',
      languageOptions: {
        parser: parserHtml,
      },
      rules: {
        'html/require-lang': 'error',
        'html/require-img-alt': 'error',
        'html/require-doctype': 'error',
        'html/require-title': 'error',
        'html/no-extra-spacing-attrs': 'error',
        'html/no-duplicate-id': 'error',
        'html/indent': ['error', indent],
        'html/require-li-container': 'error',
        'html/quotes': 'error',
        'html/require-closing-tags': 'error',
        'html/no-duplicate-attrs': 'error',
        'html/element-newline': ['error', {
          skip: ['span', 'i', 'code', 'pre'],
        }],

        ...overrides,
      },
    },
  ]
}
