import { isPackageExists } from 'local-pkg'
import { GLOB_EXCLUDE, JS_EXT } from './globs'

const CSS_IN_JS
  = isPackageExists('styled-components')
  || isPackageExists('@emotion/css')
  || isPackageExists('@emotion/react')
  || isPackageExists('@emotion/styled')

const IGNORES = !CSS_IN_JS ? JS_EXT : []

const overrides = CSS_IN_JS
  ? [
      {
        files: JS_EXT
          .map(extension => [extension, `**/${extension}`])
          .flat(),
        customSyntax: 'postcss-styled-syntax',
      },
    ]
  : []

export default {
  cache: true,
  fix: true,
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: [
    ...GLOB_EXCLUDE,
    ...IGNORES,
  ],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-html/vue'],
    },
    {
      files: ['*.html', '**/*.html', '*.htm', '**/*.htm'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-html/html'],
    },
    {
      files: ['*.svelte', '**/*.svelte'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-html/svelte'],
    },
    {
      files: ['*.md', '**/*.md'],
      customSyntax: 'postcss-markdown',
    },
    ...overrides,
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'layer',
          'apply',
          'config',
          'variants',
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
}
