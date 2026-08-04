import type { DummyRuleMap, OxlintConfig } from 'oxlint'
import { defineRules } from '../utils'

interface OxcOptions {
  rules?: DummyRuleMap
}

/**
 * 正确性规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=oxc&category=correctness
 */
const correctnessRules = defineRules({
  'oxc/bad-array-method-on-arguments': 'error',
  'oxc/bad-char-at-comparison': 'error',
  'oxc/bad-comparison-sequence': 'error',
  'oxc/bad-match-all-arg': 'error',
  'oxc/bad-min-max-func': 'error',
  'oxc/bad-object-literal-comparison': 'error',
  'oxc/bad-replace-all-arg': 'error',
  'oxc/const-comparisons': 'error',
  'oxc/double-comparisons': 'error',
  'oxc/erasing-op': 'error',
  'oxc/missing-throw': 'error',
  'oxc/number-arg-out-of-range': 'error',
  'oxc/only-used-in-recursion': 'error',
  'oxc/uninvoked-array-callback': 'error',
})

/**
 * 严格规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=oxc&category=pedantic
 */
const pedanticRules = defineRules({
  'oxc/branches-sharing-code': 'warn',
})

/**
 * 性能规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=oxc&category=performance
 */
const perfRules = defineRules({
  'oxc/no-accumulating-spread': 'error',
  'oxc/no-map-spread': ['warn', { ignoreRereads: true }],
})

/**
 * 限制规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=oxc&category=restriction
 */
const restrictionRules = defineRules({
  'oxc/bad-bitwise-operator': 'error',
  'oxc/no-async-await': 'off',
  'oxc/no-barrel-file': 'off',
  'oxc/no-const-enum': 'error',
  'oxc/no-optional-chaining': 'off',
  'oxc/no-rest-spread-properties': 'off',
})

/**
 * 可疑规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=oxc&category=suspicious
 */
const suspiciousRules = defineRules({
  'oxc/approx-constant': 'warn',
  'oxc/misrefactored-assign-op': 'off',
  'oxc/no-async-endpoint-handlers': 'off',
  'oxc/no-this-in-exported-function': 'off',
})

export function oxc({ rules }: OxcOptions = {}): OxlintConfig {
  return {
    plugins: ['oxc'],
    rules: {
      ...correctnessRules,
      ...pedanticRules,
      ...perfRules,
      ...restrictionRules,
      ...suspiciousRules,
      ...rules,
    },
  }
}
