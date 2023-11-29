import { interopDefault } from '@pengzhanbo/eslint-config'
import type { FlatConfigItem, OptionsFiles, OptionsHasTypeScript, OptionsOverrides } from '@pengzhanbo/eslint-config'
import { isPackageExists } from 'local-pkg'

export async function next(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  if (!isPackageExists('next'))
    return []

  const { overrides = {} } = options

  const nextPlugin = await interopDefault(import('@next/eslint-plugin-next'))

  return [

    {
      name: 'config:next:setup',
      plugins: {
        '@next/next': nextPlugin,
      },
    },
    {
      name: 'config:next:rules',
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
