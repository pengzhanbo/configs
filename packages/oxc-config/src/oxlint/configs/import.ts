import type { DummyRuleMap, OxlintConfig } from 'oxlint'
import { defineRules } from '../utils'

interface importOptions {
  rules?: DummyRuleMap
}

/**
 * 正确性规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=import&category=correctness
 */
const correctnessRules = defineRules({
  'import/default': 'error',
  'import/namespace': ['error', { allowComputed: false }],
})

/**
 * 严格规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=import&category=pedantic
 */
const pedanticRules = defineRules({
  'import/max-dependencies': 'off',
})

/**
 * 限制规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=import&category=restriction
 */
const restrictionRules = defineRules({
  'import/extensions': ['warn', 'always', { ignorePackages: true, checkTypeImports: true }],
  'import/no-amd': 'error',
  'import/no-commonjs': ['warn', { allowConditionalRequire: true }],
  'import/no-cycle': ['error', { ignoreTypes: true }],
  'import/no-default-export': 'off',
  'import/no-dynamic-require': 'warn',
  'import/no-relative-parent-imports': 'off',
  'import/no-webpack-loader-syntax': 'off',
  'import/unambiguous': 'warn',
})

/**
 * 样式规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=import&category=style
 */
const styleRules = defineRules({
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import/exports-last': 'off',
  'import/first': 'warn',
  'import/group-exports': 'off',
  'import/newline-after-import': ['error', { count: 1 }],
  'import/no-anonymous-default-export': 'off',
  'import/no-duplicates': ['warn', { considerQueryString: true, preferInline: false }],
  'import/no-mutable-exports': 'off',
  'import/no-named-default': 'off',
  'import/no-named-export': 'off',
  'import/no-namespace': 'off',
  'import/no-nodejs-modules': 'off',
  'import/prefer-default-export': 'off',
})

/**
 * 可疑规则
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=import&category=suspicious
 */
const suspiciousRules = defineRules({
  'import/no-absolute-path': 'warn',
  'import/no-empty-named-blocks': 'warn',
  'import/no-named-as-default': 'off',
  'import/no-named-as-default-member': 'off',
  'import/no-self-import': 'warn',
  'import/no-unassigned-import': 'off',
})

const nurseryRules = defineRules({
  'import/export': 'off',
  'import/named': 'off',
})

export function importRules({ rules }: importOptions = {}): OxlintConfig {
  return {
    plugins: ['import'],
    rules: {
      ...correctnessRules,
      ...pedanticRules,
      ...restrictionRules,
      ...styleRules,
      ...suspiciousRules,
      ...nurseryRules,
      ...rules,
    },
    overrides: [
      {
        plugins: ['import'],
        files: ['**/*.cjs', '**/*.mts'],
        rules: {
          'import/no-commonjs': 'off',
          'import/unambiguous': 'off',
        },
      },
      {
        plugins: ['import'],
        files: ['**/*.d.ts'],
        rules: {
          'import/unambiguous': 'off',
        },
      },
    ],
  }
}
