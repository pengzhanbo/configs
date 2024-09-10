import defineConfig from 'stylelint-define-config'
import type {
  Extends as OrderExtends,
  Plugins as OrderPlugins,
  RuleOptions as OrderRuleOptions,
} from '@stylelint-types/stylelint-order/types'
import type {
  Extends as SCSSExtends,
  Plugins as SCSSPlugins,
  RuleOptions as SCSSRuleOptions,
  Syntax as SCSSSyntax,
} from '@stylelint-types/stylelint-scss/types'
import type {
  Plugins as StylisticPlugins,
  RuleOptions as StylisticRuleOptions,
} from '@stylelint-types/stylelint-stylistic/types'
import type { Rules, StylelintConfig } from 'stylelint-define-config'

declare module 'stylelint-define-config' {
  export interface CustomRuleOptions extends StylisticRuleOptions, OrderRuleOptions, SCSSRuleOptions {}
  export interface CustomPlugins extends StylisticPlugins, OrderPlugins, SCSSPlugins {}
  export interface CustomExtends extends OrderExtends, SCSSExtends {}
  export interface CustomSyntax extends SCSSSyntax {}
}

export type StylelintRules = Partial<Rules>

export type { OrderRuleOptions, SCSSRuleOptions, StylelintConfig, StylisticRuleOptions }

export default defineConfig
