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
        '@next/next': nextPlugin,
      },
    },
    {
      name: 'config/nextjs/rules',
      rules: {
        // warnings
        '@next/next/google-font-display': 'warn',
        '@next/next/google-font-preconnect': 'warn',
        '@next/next/next-script-for-ga': 'warn',
        '@next/next/no-async-client-component': 'warn',
        '@next/next/no-before-interactive-script-outside-document': 'warn',
        '@next/next/no-css-tags': 'warn',
        '@next/next/no-head-element': 'warn',
        '@next/next/no-img-element': 'warn',
        '@next/next/no-page-custom-font': 'warn',
        '@next/next/no-styled-jsx-in-document': 'warn',
        '@next/next/no-title-in-document-head': 'warn',
        '@next/next/no-typos': 'warn',
        '@next/next/no-unwanted-polyfillio': 'warn',
        // errors
        '@next/next/inline-script-id': 'error',
        '@next/next/no-assign-module-variable': 'error',
        '@next/next/no-document-import-in-page': 'error',
        '@next/next/no-duplicate-head': 'error',
        '@next/next/no-head-import-in-document': 'error',
        '@next/next/no-script-component-in-head': 'error',

        '@next/next/no-html-link-for-pages': pagesDir ? ['warn', pagesDir] : 'warn',
        '@next/next/no-sync-scripts': 'warn',

        'import/no-anonymous-default-export': 'warn',
        'react/no-unknown-property': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': 'off',

        ...overrides,
      },
    },

  ]
}
