import type { OxlintConfig, OxlintOverride } from 'oxlint'

export interface Options extends Omit<OxlintConfig, 'ignorePatterns'> {
  ignores?: string[]
  ts?: boolean
  regexp?: boolean
  jsxA11y?: boolean
  import?: boolean
  jsdoc?: boolean
  unicorn?: boolean
  test?: boolean
  promise?: boolean
  vue?: boolean
  react?: boolean
  node?: boolean | string[] | OxlintOverride
}
