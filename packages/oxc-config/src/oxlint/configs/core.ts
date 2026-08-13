import type { DummyRuleMap, OxlintConfig } from 'oxlint'
import { defineRules } from '../utils'

interface CoreOptions {
  rules?: DummyRuleMap
}

/**
 * 正确性规则, 此类规则均有默认设置，
 * 此处仅对部分规则进行重新设置。
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=correctness
 */
const correctnessRules = defineRules({
  'constructor-super': 'error',
  'for-direction': 'off',
  'getter-return': 'off',
  'no-async-promise-executor': 'error',
  'no-caller': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': ['error', 'always'],
  'no-const-assign': 'error',
  'no-constant-binary-expression': 'off',
  'no-constant-condition': 'off',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-else-if': 'off',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty-character-class': 'off',
  'no-empty-pattern': 'error',
  'no-empty-static-block': 'off',
  'no-eval': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-func-assign': 'error',
  'no-global-assign': 'error',
  'no-import-assign': 'error',
  'no-invalid-regexp': 'off',
  'no-irregular-whitespace': 'error',
  'no-iterator': 'error',
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-nonoctal-decimal-escape': 'off',
  'no-obj-calls': 'error',
  'no-self-assign': ['error', { props: true }],
  'no-setter-return': 'off',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-this-before-super': 'error',
  'no-unassigned-vars': 'off',
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unsafe-optional-chaining': 'off',
  'no-unused-expressions': ['error', { allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true }],
  'no-unused-labels': 'off',
  'no-unused-private-class-members': 'off',
  'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none', ignoreRestSiblings: true, vars: 'all' }],
  'no-useless-backreference': 'off',
  'no-useless-catch': 'error',
  'no-useless-escape': 'off',
  'no-useless-rename': 'error',
  'no-with': 'error',
  'require-yield': 'off',
  'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
  'valid-typeof': ['error', { requireStringLiterals: true }],
})

/**
 * 严格规则，此类规则对于代码要求严格，吹毛求疵
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=pedantic
 */
const pedanticRules = defineRules({
  'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
  'array-callback-return': 'error',
  'eqeqeq': ['error', 'smart', { null: 'never' }],
  'max-classes-per-file': 'off',
  'max-depth': 'off',
  'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
  'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
  'max-nested-callbacks': 'off',
  'no-array-constructor': 'error',
  'no-case-declarations': 'error',
  'no-constructor-return': 'off',
  'no-else-return': 'off',
  'no-fallthrough': 'error',
  'no-inline-comments': 'off',
  'no-inner-declarations': 'off',
  'no-lonely-if': 'off',
  'no-loop-func': 'off',
  'no-negated-condition': 'off',
  'no-new-wrappers': 'error',
  'no-object-constructor': 'off',
  'no-promise-executor-return': 'off',
  'no-prototype-builtins': 'error',
  'no-redeclare': ['error', { builtinGlobals: false }],
  'no-self-compare': 'error',
  'no-throw-literal': 'error',
  'no-useless-return': 'error',
  'no-warning-comments': 'off',
  'radix': 'off',
  'require-await': 'off',
  'require-unicode-regexp': 'off',
  'sort-vars': 'off',
  'symbol-description': 'error',
})

/**
 * 性能规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=performance
 */
const perfRules = defineRules({
  'no-await-in-loop': 'off',
  'no-useless-call': 'error',
})

/**
 * 限制规则, 限制某些特性
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=restriction
 */
const restrictionRules = defineRules({
  'class-methods-use-this': 'off',
  'complexity': ['error', { max: 30, variant: 'modified' }],
  'default-case': ['error', { commentPattern: '^no\\sdefault' }],
  'no-alert': 'error',
  'no-bitwise': 'off',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-div-regex': 'off',
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-empty-function': 'off',
  'no-eq-null': 'off',
  'no-implicit-globals': 'off',
  'no-param-reassign': 'off',
  'no-plusplus': 'off',
  'no-proto': 'error',
  'no-regex-spaces': 'error',
  'no-restricted-globals': ['error', {
    message: 'Use `globalThis` instead.',
    name: 'global',
  }, { message: 'Use `globalThis` instead.', name: 'self' }],
  'no-restricted-imports': 'off',
  'no-restricted-properties': ['error', {
    message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
    property: '__proto__',
  }, {
    message: 'Use `Object.defineProperty` instead.',
    property: '__defineGetter__',
  }, {
    message: 'Use `Object.defineProperty` instead.',
    property: '__defineSetter__',
  }, {
    message: 'Use `Object.getOwnPropertyDescriptor` instead.',
    property: '__lookupGetter__',
  }, {
    message: 'Use `Object.getOwnPropertyDescriptor` instead.',
    property: '__lookupSetter__',
  }],
  'no-sequences': 'error',
  'no-undefined': 'off',
  'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
  'no-var': 'error',
  'no-void': 'off',
  'unicode-bom': ['error', 'never'],
},
)

/**
 * 样式规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=style
 */
const styleRules = defineRules({
  'arrow-body-style': ['error', 'as-needed'],
  'capitalized-comments': 'off',
  'curly': ['error', 'all'],
  'default-case-last': 'error',
  'default-param-last': 'error',
  'func-name-matching': 'off',
  'func-names': ['warn', 'as-needed'],
  'func-style': 'off',
  'grouped-accessor-pairs': 'off',
  'guard-for-in': 'off',
  'id-denylist': 'off',
  'id-length': 'off',
  'id-match': 'off',
  'init-declarations': 'off',
  'logical-assignment-operators': 'off',
  'max-params': ['warn', { max: 6 }],
  'max-statements': 'off',
  'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
  'no-continue': 'off',
  'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
  'no-extra-label': 'off',
  'no-implicit-coercion': 'off',
  'no-label-var': 'off',
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': 'error',
  'no-magic-numbers': 'off',
  'no-multi-assign': 'off',
  'no-multi-str': 'error',
  'no-nested-ternary': 'off',
  'no-new-func': 'error',
  'no-return-assign': 'off',
  'no-script-url': 'off',
  'no-template-curly-in-string': 'error',
  'no-ternary': 'off',
  'no-useless-computed-key': 'error',
  'object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
  'one-var': 'off',
  'operator-assignment': 'off',
  'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
  'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
  'prefer-destructuring': 'off',
  'prefer-exponentiation-operator': 'error',
  'prefer-named-capture-group': 'off',
  'prefer-numeric-literals': 'off',
  'prefer-object-has-own': 'off',
  'prefer-object-spread': 'off',
  'prefer-promise-reject-errors': 'error',
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'sort-imports': 'off',
  'sort-keys': 'off',
  'vars-on-top': 'error',
  'yoda': ['error', 'never'],
})

/**
 * 可疑性规则，对于代码存在歧义的情况进行警告
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=suspicious
 */
const suspiciousRules = defineRules({
  'block-scoped-var': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-implied-eval': 'error',
  'no-new': 'error',
  'no-shadow': ['warn', { allow: ['_'] }],
  'no-underscore-dangle': 'off',
  'no-unexpected-multiline': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'no-useless-concat': 'off',
  'no-useless-constructor': 'error',
  'preserve-caught-error': 'off',
})

/**
 * 实验性规则， 此类规则默认关闭
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=eslint&category=nursery
 */
const nurseryRules = defineRules({
  'no-restricted-exports': 'off',
  'no-undef': 'off',
  'no-unreachable-loop': 'off',
  'no-useless-assignment': 'off',
})

export function core({ rules }: CoreOptions = {}): OxlintConfig {
  return {
    plugins: ['eslint'],
    rules: {
      ...correctnessRules,
      ...pedanticRules,
      ...perfRules,
      ...restrictionRules,
      ...styleRules,
      ...suspiciousRules,
      ...nurseryRules,
      ...rules,
    },
  }
}
