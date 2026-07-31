import type { OxlintConfig } from 'oxlint'

export function test(): OxlintConfig {
  return {
    overrides: [
      {
        plugins: ['vitest'],
        files: [
          '**/__tests__/**/*.?([cm])[jt]s?(x)',
          '**/*.spec.?([cm])[jt]s?(x)',
          '**/*.test.?([cm])[jt]s?(x)',
          '**/*.bench.?([cm])[jt]s?(x)',
          '**/*.benchmark.?([cm])[jt]s?(x)',
        ],
        rules: {
          'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
          'vitest/no-identical-title': 'error',
          'vitest/no-import-node-test': 'error',
          'vitest/prefer-hooks-in-order': 'error',
          'vitest/prefer-lowercase-title': 'error',
          'no-unused-expressions': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
      },
    ],
  }
}
