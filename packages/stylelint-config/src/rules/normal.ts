import type { StylelintRules } from '../define-config'

export const normalRules = {
  'at-rule-no-unknown': [
    true,
    {
      ignoreAtRules: [
        'tailwind',
        'layer',
        'apply',
        'config',
        'theme',
        'screen',
      ],
    },
  ],
  'unit-no-unknown': [true, { ignoreUnits: ['rpx'], severity: 'warning' }],
  'color-function-notation': 'legacy',
  'alpha-value-notation': 'number',
  'selector-class-pattern': null,
  'selector-pseudo-class-no-unknown': [
    true,
    {
      ignorePseudoClasses: ['deep', 'global'],
    },
  ],
  'no-duplicate-selectors': null,
} as StylelintRules
