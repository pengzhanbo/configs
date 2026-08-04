import type { DummyRuleMap, OxlintConfig } from 'oxlint'
import { defineRules } from '../utils'

interface PromiseOptions {
  rules?: DummyRuleMap
}

const promiseRules = defineRules({
  'promise/always-return': ['error', { ignoreLastCallback: true }],
  'promise/avoid-new': 'off',
  'promise/catch-or-return': 'error',
  'promise/no-callback-in-promise': 'off',
  'promise/no-multiple-resolved': 'error',
  'promise/no-nesting': 'warn',
  'promise/no-new-statics': 'error',
  'promise/no-promise-in-callback': 'warn',
  'promise/no-return-in-finally': 'error',
  'promise/no-return-wrap': ['error', { allowReject: true }],
  'promise/param-names': 'off',
  'promise/prefer-await-to-callbacks': 'off',
  'promise/prefer-await-to-then': 'off',
  'promise/prefer-catch': 'off',
  'promise/spec-only': 'off',
  'promise/valid-params': 'error',
})

export function promise({ rules }: PromiseOptions = {}): OxlintConfig {
  return {
    plugins: ['promise'],
    rules: {
      ...promiseRules,
      ...rules,
    },
  }
}
