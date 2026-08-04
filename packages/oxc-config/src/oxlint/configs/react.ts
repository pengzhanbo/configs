import type { DummyRuleMap, OxlintConfig } from 'oxlint'

interface ReactOptions {
  rules?: DummyRuleMap
}

export function react({ rules }: ReactOptions = {}): OxlintConfig {
  return {
    plugins: ['react', 'react-perf'],
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
      ...rules,
    },
  }
}
