import type { DummyRuleMap, OxlintConfig } from 'oxlint'

interface JsdocConfig {
  ts?: boolean
  rules?: DummyRuleMap
}

export function jsdoc({ ts, rules }: JsdocConfig = {}): OxlintConfig {
  return {
    plugins: ['jsdoc'],
    settings: {
      jsdoc: {
        tagNamePreference: {
          category: 'category',
          typeParam: 'typeParam',
          module: 'module',
          remarks: 'remarks',
          hideCategories: 'hideCategories',
        },
      },
    },
    rules: {
      'jsdoc/check-access': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/check-tag-names': ts ? ['warn', { typed: true }] : 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-param': ['warn', { checkConstructors: true, checkDestructuredRoots: false }],
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param-type': ts ? 'off' : 'warn',
      'jsdoc/require-property-type': ts ? 'off' : 'warn',
      'jsdoc/require-returns': ['warn', { checkGetters: false }],
      'jsdoc/require-returns-type': ts ? 'off' : 'warn',
      'jsdoc/require-throws-description': 'warn',
      'jsdoc/require-throws-type': 'warn',
      'jsdoc/require-yields': 'warn',
      'jsdoc/require-yields-description': 'warn',
      'jsdoc/require-yields-type': 'warn',
      ...rules,
    },
  }
}
