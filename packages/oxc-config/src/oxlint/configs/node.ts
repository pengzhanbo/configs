import type { OxlintConfig } from 'oxlint'

export function node(): OxlintConfig {
  return {
    overrides: [
      {
        plugins: ['node'],
        files: ['**/*.?([cm])[jt]s?(x)'],
        rules: {
          'node/no-exports-assign': 'error',
          'node/no-new-require': 'error',
          'node/handle-callback-err': ['error', '^(err|error)$'],
          'node/no-path-concat': 'error',
        },
      },
    ],
  }
}
