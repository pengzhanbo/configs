import type { DummyRuleMap, OxlintConfig } from 'oxlint'
import { defineRules } from '../utils'

interface TypescriptOptions {
  rules?: DummyRuleMap
}

const correctnessRules = defineRules({
  'typescript/await-thenable': 'error',
  'typescript/no-array-delete': 'error',
  'typescript/no-base-to-string': 'error',
  'typescript/no-duplicate-enum-values': 'error',
  'typescript/no-duplicate-type-constituents': 'error',
  'typescript/no-extra-non-null-assertion': 'error',
  'typescript/no-floating-promises': 'error',
  'typescript/no-for-in-array': 'error',
  'typescript/no-implied-eval': 'error',
  'typescript/no-meaningless-void-operator': 'error',
  'typescript/no-misused-new': 'error',
  'typescript/no-misused-spread': 'error',
  'typescript/no-non-null-asserted-optional-chain': 'error',
  'typescript/no-redundant-type-constituents': 'error',
  'typescript/no-this-alias': 'error',
  'typescript/no-unnecessary-parameter-property-assignment': 'error',
  'typescript/no-unsafe-declaration-merging': 'error',
  'typescript/no-unsafe-unary-minus': 'error',
  'typescript/no-useless-default-assignment': 'off',
  'typescript/no-useless-empty-export': 'error',
  'typescript/no-wrapper-object-types': 'error',
  'typescript/prefer-as-const': 'error',
  'typescript/prefer-namespace-keyword': 'error',
  'typescript/require-array-sort-compare': 'error',
  'typescript/restrict-template-expressions': 'error',
  'typescript/triple-slash-reference': 'off',
  'typescript/unbound-method': 'off',
})

const pedanticRules = defineRules({
  'typescript/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
  'typescript/ban-types': 'off', // deprecated
  'typescript/no-confusing-void-expression': 'off',
  'typescript/no-deprecated': 'warn',
  'typescript/no-misused-promises': 'off',
  'typescript/no-mixed-enums': 'off',
  'typescript/no-unsafe-argument': 'off',
  'typescript/no-unsafe-assignment': 'off',
  'typescript/no-unsafe-call': 'off',
  'typescript/no-unsafe-function-type': 'error',
  'typescript/no-unsafe-member-access': 'off',
  'typescript/no-unsafe-return': 'off',
  'typescript/only-throw-error': 'error',
  'typescript/prefer-enum-initializers': 'error',
  'typescript/prefer-includes': 'warn',
  'typescript/prefer-nullish-coalescing': 'warn',
  'typescript/prefer-promise-reject-errors': 'error',
  'typescript/prefer-readonly-parameter-types': 'off',
  'typescript/prefer-ts-expect-error': 'error',
  'typescript/related-getter-setter-pairs': 'error',
  'typescript/require-await': 'error',
  'typescript/restrict-plus-operands': 'error',
  'typescript/return-await': ['error', 'in-try-catch'],
  'typescript/strict-boolean-expressions': 'off',
  'typescript/strict-void-return': 'off',
  'typescript/switch-exhaustiveness-check': 'error',
})

const restrictionRules = defineRules({
  'typescript/explicit-function-return-type': [
    'error',
    { allowExpressions: true, allowTypedFunctionExpressions: true },
  ],
  'typescript/explicit-member-accessibility': ['warn', {
    accessibility: 'no-public',
    overrides: { parameterProperties: 'explicit' },
  }],
  'typescript/explicit-module-boundary-types': 'error',
  'typescript/no-dynamic-delete': 'off',
  'typescript/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
  'typescript/no-explicit-any': 'off',
  'typescript/no-import-type-side-effects': 'error',
  'typescript/no-invalid-void-type': 'off',
  'typescript/no-namespace': 'error',
  'typescript/no-non-null-asserted-nullish-coalescing': 'error',
  'typescript/no-non-null-assertion': 'off',
  'typescript/no-require-imports': 'error',
  'typescript/no-restricted-types': 'off',
  'typescript/no-var-requires': 'off',
  'typescript/non-nullable-type-assertion-style': 'off',
  'typescript/prefer-literal-enum-member': 'error',
  'typescript/promise-function-async': 'off',
  'typescript/use-unknown-in-catch-callback-variable': 'off',
})

const styleRule = defineRules({
  'typescript/adjacent-overload-signatures': 'error',
  'typescript/array-type': 'off',
  'typescript/ban-tslint-comment': 'error',
  'typescript/class-literal-property-style': 'off',
  'typescript/consistent-generic-constructors': 'off',
  'typescript/consistent-indexed-object-style': 'off',
  'typescript/consistent-type-assertions': 'off',
  'typescript/consistent-type-definitions': ['error', 'interface'],
  'typescript/consistent-type-exports': 'error',
  'typescript/consistent-type-imports': ['error', { disallowTypeAnnotations: false, fixStyle: 'separate-type-imports', prefer: 'type-imports' }],
  'typescript/dot-notation': ['error', { allowKeywords: true }],
  'typescript/method-signature-style': 'off',
  'typescript/no-empty-interface': 'off',
  'typescript/no-inferrable-types': 'off',
  'typescript/no-unnecessary-qualifier': 'warn',
  'typescript/parameter-properties': 'off',
  'typescript/prefer-find': 'off',
  'typescript/prefer-for-of': 'off',
  'typescript/prefer-function-type': 'off',
  'typescript/prefer-readonly': 'off',
  'typescript/prefer-reduce-type-parameter': 'error',
  'typescript/prefer-regexp-exec': 'off',
  'typescript/prefer-return-this-type': 'off',
  'typescript/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'always' }],
  'typescript/unified-signatures': 'off',
})

const suspiciousRules = defineRules({
  'typescript/consistent-return': 'off',
  'typescript/no-confusing-non-null-assertion': 'error',
  'typescript/no-extraneous-class': 'off',
  'typescript/no-unnecessary-boolean-literal-compare': ['error', {
    allowComparingNullableBooleansToFalse: true,
    allowComparingNullableBooleansToTrue: true,
  }],
  'typescript/no-unnecessary-template-expression': 'error',
  'typescript/no-unnecessary-type-arguments': 'error',
  'typescript/no-unnecessary-type-assertion': 'error',
  'typescript/no-unnecessary-type-constraint': 'error',
  'typescript/no-unnecessary-type-conversion': 'off',
  'typescript/no-unnecessary-type-parameters': 'off',
  'typescript/no-unsafe-enum-comparison': 'off',
  'typescript/no-unsafe-type-assertion': 'off',
})

const nurseryRules = defineRules({
  'typescript/no-unnecessary-condition': 'off',
  'typescript/prefer-optional-chain': 'off',
})

export function typescript({ rules: userRules }: TypescriptOptions = {}): OxlintConfig {
  const rules: DummyRuleMap = {
    ...correctnessRules,
    ...pedanticRules,
    ...restrictionRules,
    ...styleRule,
    ...suspiciousRules,
    ...nurseryRules,
    ...userRules,
  }
  return {
    plugins: ['typescript'],
    rules,
    overrides: [
      {
        plugins: ['eslint'],
        files: ['**/*.{ts,tsx,cts,mts}'],
        rules: {
          'constructor-super': 'off',
          'getter-return': 'off',
          'no-class-assign': 'off',
          'no-const-assign': 'off',
          'no-dupe-keys': 'off',
          'no-func-assign': 'off',
          'no-import-assign': 'off',
          'no-new-native-nonconstructor': 'off',
          'no-obj-calls': 'off',
          'no-redeclare': ['error', { builtinGlobals: false }],
          'no-setter-return': 'off',
          'no-this-before-super': 'off',
          'no-unreachable': 'off',
          'no-unsafe-negation': 'off',
          'no-with': 'off',
          'prefer-const': [
            'error',
            { destructuring: 'all', ignoreReadBeforeAssign: true },
          ],
          'no-unused-expressions': [
            'error',
            { allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true },
          ],
          'no-unused-vars': 'off',
          'no-useless-constructor': 'off',
          'no-use-before-define': [
            'error',
            { classes: false, functions: false, variables: true },
          ],
        },
      },
      {
        plugins: ['typescript'],
        files: ['**/*.{js,jsx,cjs,mjs}'],
        rules: Object.fromEntries(Object.keys(rules).map(key => [key, 'off'])),
      },
    ],
  }
}
