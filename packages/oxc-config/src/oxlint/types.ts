import type { OxlintConfig } from 'oxlint'

export interface Options extends Omit<OxlintConfig, 'ignorePatterns'> {
  ignores?: string[]
  ts?: boolean
  stylistic?: boolean
  regexp?: boolean
  jsxA11y?: boolean
  vue?: boolean
  react?: boolean
  node?: boolean | string[]
}
