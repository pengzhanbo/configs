import defineConfig from 'stylelint-define-config'
import type { Rules, StylelintConfig } from 'stylelint-define-config'
import type {
  Plugins as CodeguidePlugins,
  RuleOptions as CodeguideRuleOptions,
} from '@stylelint-types/stylelint-codeguide/types'
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

declare module 'stylelint-define-config' {
  export interface CustomRuleOptions extends CodeguideRuleOptions, OrderRuleOptions, SCSSRuleOptions {}
  export interface CustomPlugins extends CodeguidePlugins, OrderPlugins, SCSSPlugins {}
  export interface CustomExtends extends OrderExtends, SCSSExtends {}
  export interface CustomSyntax extends SCSSSyntax {}
}

export type StylelintRules = Partial<Rules>

export type { StylelintConfig, CodeguideRuleOptions, OrderRuleOptions, SCSSRuleOptions }

export default defineConfig
