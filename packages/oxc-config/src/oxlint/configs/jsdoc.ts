import type { OxlintConfig } from 'oxlint'

export function jsdoc(): OxlintConfig {
  return {
    plugins: ['jsdoc'],
    rules: {
      'jsdoc/check-access': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-returns-description': 'warn',
    },
  }
}
