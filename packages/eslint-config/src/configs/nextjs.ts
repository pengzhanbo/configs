import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export async function nextjs(
  options: OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const { overrides = {} } = options

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
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,

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
