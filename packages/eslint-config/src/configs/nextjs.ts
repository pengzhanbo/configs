import type { OptionsNextjs, OptionsOverrides, TypedFlatConfigItem } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export async function nextjs(
  options: OptionsNextjs & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const { overrides = {}, pagesDir } = options

  await ensurePackages(['@next/eslint-plugin-next'])

  const nextPlugin = await interopDefault(import('@next/eslint-plugin-next'))

  return [

    {
      name: 'config/nextjs/setup',
      plugins: {
        nextjs: nextPlugin,
      },
    },
    {
      name: 'config/nextjs/rules',
      rules: {
        // warnings
        'nextjs/google-font-display': 'warn',
        'nextjs/google-font-preconnect': 'warn',
        'nextjs/next-script-for-ga': 'warn',
        'nextjs/no-async-client-component': 'warn',
        'nextjs/no-before-interactive-script-outside-document': 'warn',
        'nextjs/no-css-tags': 'warn',
        'nextjs/no-head-element': 'warn',
        'nextjs/no-img-element': 'warn',
        'nextjs/no-page-custom-font': 'warn',
        'nextjs/no-styled-jsx-in-document': 'warn',
        'nextjs/no-title-in-document-head': 'warn',
        'nextjs/no-typos': 'warn',
        'nextjs/no-unwanted-polyfillio': 'warn',
        // errors
        'nextjs/inline-script-id': 'error',
        'nextjs/no-assign-module-variable': 'error',
        'nextjs/no-document-import-in-page': 'error',
        'nextjs/no-duplicate-head': 'error',
        'nextjs/no-head-import-in-document': 'error',
        'nextjs/no-script-component-in-head': 'error',

        'nextjs/no-html-link-for-pages': pagesDir ? ['warn', pagesDir] : 'warn',
        'nextjs/no-sync-scripts': 'warn',

        'import/no-anonymous-default-export': 'warn',

        ...overrides,
      },
    },

  ]
}
