import { isPackageExists } from 'local-pkg'

const cssInJs
  = isPackageExists('styled-components')
  || isPackageExists('@emotion/css')
  || isPackageExists('@emotion/react')
  || isPackageExists('@emotion/styled')

const jsExtension = [
  '*.js',
  '*.ts',
  '*.jsx',
  '*.tsx',
  '*.mjs',
  '*.cjs',
  '*.mts',
  '*.cts',
]

const ignoreJs = !cssInJs ? jsExtension : []

const jsOverrides = cssInJs
  ? [
      {
        files: jsExtension
          .map(extension => [extension, `**/${extension}`])
          .flat(),
        customSyntax: 'postcss-styled-syntax',
      },
    ]
  : []

export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: [
    '**/node_modules/**',
    'dist',
    '*.d.ts',
    '*.min.*',
    'LICENSE*',
    'public',
    'output',
    'out',
    'temp',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '*.png',
    '*.ico',
    '*.toml',
    '*.patch',
    '*.txt',
    '*.crt',
    '*.key',
    '*Dockerfile',
    '.vitepress/cache',
    ...ignoreJs,
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
    ...jsOverrides,
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
