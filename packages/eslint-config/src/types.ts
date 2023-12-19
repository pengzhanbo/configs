import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
import type {
  EslintCommentsRules,
  EslintRules,
  FlatESLintConfigItem,
  ImportRules,
  JsoncRules,
  MergeIntersection,
  NRules,
  Prefix,
  ReactHooksRules,
  ReactRules,
  RenamePrefix,
  RuleConfig,
  VitestRules,
  VueRules,
  YmlRules,
} from '@antfu/eslint-define-config'
import type { RuleOptions as JSDocRules } from '@eslint-types/jsdoc/types'
import type { RuleOptions as TypeScriptRules } from '@eslint-types/typescript-eslint/types'
import type { RuleOptions as UnicornRules } from '@eslint-types/unicorn/types'
import type { Rules as AntfuRules } from 'eslint-plugin-antfu'
import type { StylisticCustomizeOptions, UnprefixedRuleOptions as StylisticRules } from '@stylistic/eslint-plugin'

export type WrapRuleConfig<T extends { [key: string]: any }> = {
  [K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>
}

export type Awaitable<T> = T | Promise<T>

export type Rules = WrapRuleConfig<
  MergeIntersection<
    RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'> &
    RenamePrefix<VitestRules, 'vitest/', 'test/'> &
    RenamePrefix<YmlRules, 'yml/', 'yaml/'> &
    RenamePrefix<NRules, 'n/', 'node/'> &
    Prefix<StylisticRules, 'style/'> &
    Prefix<AntfuRules, 'antfu/'> &
    ReactHooksRules &
    ReactRules &
    JSDocRules &
    ImportRules &
    EslintRules &
    JsoncRules &
    VueRules &
    UnicornRules &
    EslintCommentsRules &
    {
      'test/no-only-tests': RuleConfig<[]>
    }
  >
>

export type FlatConfigItem = Omit<FlatESLintConfigItem<Rules, false>, 'plugins'> & {
  /**
   * Custom name of each config item
   */
  name?: string

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
}

export type UserConfigItem = FlatConfigItem | Linter.FlatConfig

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[]
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[]
}

export interface OptionsFrameworkExtract {}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig
}

export interface StylisticConfig extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {
}

export interface OptionsOverrides {
  overrides?: FlatConfigItem['rules']
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}

export interface OptionsUnoCSS {
  /**
   * Enable attributify support.
   * @default true
   */
  attributify?: boolean
  /**
   * Enable strict mode by throwing errors about blocklisted classes.
   * @default false
   */
  strict?: boolean
}

export interface OptionsTailwindCSS {
  /**
   * Read CSS files
   */
  cssFiles?: string[]
  /**
   * List of whitelisted classes. when `no-custom-classname` is enabled,
   * only allow classnames from Tailwind CSS and the values from the whitelist option.
   * @default []
   */
  whitelist?: string[]
  /**
   * Enable custom class names.
   *
   * If it is false, only allow classnames from Tailwind CSS and the values
   * from the `whitelist` option
   * @default true
   */
  customClassNames?: boolean
}

export type PresetItem = (options: Required<Omit<OptionsConfig, 'preset'>> & { stylistic: false | StylisticConfig }) => Awaitable<FlatConfigItem[]>[]

export interface OptionsConfig extends OptionsComponentExts, OptionsFrameworkExtract {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions

  /**
   * preset eslint flat configs.
   *
   * Provide an array of preset configs.
   *
   * default: [defaultPreset]
   */
  preset?: PresetItem[]

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypeScriptWithTypes | OptionsTypeScriptParserOptions

  /**
   * Enable JSX related rules.
   *
   * Currently only stylistic rules are included.
   *
   * @default true
   */
  jsx?: boolean

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean

  /**
   * Enable TOML support.
   */
  toml?: boolean

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean

  /**
   * Enable Markdown support.
   *
   *
   * @default true
   */
  markdown?: boolean

  /**
   * Enable HTML support.
   */
  html?: boolean

  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | StylisticConfig

  /**
   * Enable unocss rules.
   *
   * Requires installing:
   * - `@unocss/eslint-plugin`
   *
   * @default false
   */
  unocss?: boolean | OptionsUnoCSS

  /**
   * Enable TailwindCSS rules.
   *
   * Requires installing:
   * - `eslint-plugin-tailwindcss`
   */
  tailwindcss?: boolean | OptionsTailwindCSS

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean

  /**
   * Provide overrides for rules for each integration.
   */
  overrides?: {
    html?: FlatConfigItem['rules']
    javascript?: FlatConfigItem['rules']
    typescript?: FlatConfigItem['rules']
    test?: FlatConfigItem['rules']
    jsonc?: FlatConfigItem['rules']
    markdown?: FlatConfigItem['rules']
    yaml?: FlatConfigItem['rules']
    toml?: FlatConfigItem['rules']
    vue?: FlatConfigItem['rules']
    react?: FlatConfigItem['rules']
    nextjs?: FlatConfigItem['rules']
    solid?: FlatConfigItem['rules']
    svelte?: FlatConfigItem['rules']
    astro?: FlatConfigItem['rules']
  }
}
