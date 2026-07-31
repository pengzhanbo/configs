import type { OxlintConfig } from 'oxlint'

export function react(): OxlintConfig {
  return {
    overrides: [
      {
        plugins: ['react'],
        files: ['**/*.?([cm])[jt]s?(x)'],
        rules: {
          'react/exhaustive-deps': 'warn',
          'react/no-array-index-key': 'warn',
          'react/no-clone-element': 'warn',
          'react/no-direct-mutation-state': 'error',
          'react/rules-of-hooks': 'error',
          'react/jsx-no-comment-textnodes': 'warn',
          'react/only-export-components': [
            'error',
            {
              allowConstantExport: true,
              allowExportNames: [],
            },
          ],
        },
      },
    ],
  }
}
