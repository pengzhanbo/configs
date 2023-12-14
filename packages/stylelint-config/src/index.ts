import { isPackageExists } from 'local-pkg'
import type { StylelintConfig } from 'stylelint-define-config'
import { GLOB_EXCLUDE, JS_EXT } from './globs'
import orderRules from './config/order'

// stylelint-stylistic 作者考虑弃用该包，
// 考虑与 stylelint-codeguide 合并，
// 持续关注社区进度

// 待实现
const CSS_IN_JS = false

const IGNORES = !CSS_IN_JS ? JS_EXT.map(ext => `**/${ext}`) : []

export default {
  extends: ['stylelint-config-standard', 'stylelint-config-html'],
  plugins: ['stylelint-order'],
  ignoreFiles: [
    ...GLOB_EXCLUDE,
    ...IGNORES,
  ],
  overrides: ([
    isPackageExists('sass') && {
      files: ['*.scss', '**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
  ] as NonNullable<StylelintConfig['overrides']>).filter(Boolean),
  rules: {
    ...orderRules,

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
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],

  },
} as StylelintConfig
