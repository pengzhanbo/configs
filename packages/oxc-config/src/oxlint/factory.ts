import type { OxlintConfig, OxlintOverride } from 'oxlint'
import type { Options } from './types'
import {
  core,
  ignore,
  importRules,
  jsdoc,
  jsx,
  node,
  oxc,
  promise,
  react,
  regexp,
  test,
  typescript,
  unicorn,
  vue,
} from './configs'
import { splitRules } from './utils'

export function oxlintConfig(options: Options = {}, ...overrides: OxlintOverride[]): OxlintConfig {
  const {
    ignores,
    ts = true,
    regexp: enableRegexp = true,
    jsxA11y: enableJsxA11y = false,
    import: enableImport = true,
    jsdoc: enableJsdoc = true,
    unicorn: enableUnicorn = true,
    test: enableTest = true,
    promise: enablePromise = true,
    vue: enableVue = false,
    react: enableReact = false,
    node: enableNode = false,
    rules = {},
    extends: userExtends = [],
    overrides: userOverrides = [],
    options: userOptions = {},
    categories: userCategories = {},
    env: userEnv = {},
    ...userConfig
  } = options

  const configs: OxlintConfig[] = []
  const userRules = splitRules(rules)

  configs.push(core({ rules: userRules.core }))
  configs.push(oxc({ rules: userRules.oxc }))

  if (enableImport)
    configs.push(importRules({ rules: userRules.import }))

  if (enableJsdoc)
    configs.push(jsdoc({ ts, rules: userRules.jsdoc }))

  if (enableUnicorn)
    configs.push(unicorn({ rules: userRules.unicorn }))

  if (enablePromise)
    configs.push(promise({ rules: userRules.promise }))

  if (enableJsxA11y)
    configs.push(jsx({ rules: userRules['jsx-a11y'] }))

  if (ts) {
    configs.push(typescript({ rules: userRules.typescript }))
  }

  if (enableNode) {
    configs.push(node({
      files: Array.isArray(enableNode) ? enableNode : undefined,
      rules: userRules.node,
    }))
  }

  if (enableRegexp) {
    configs.push(regexp({ rules: userRules.regexp }))
  }

  if (enableVue) {
    configs.push(vue({ rules: userRules.vue }))
  }

  if (enableReact) {
    configs.push(react({ rules: { ...userRules.react, ...userRules['react-perf'] } }))
  }

  if (enableTest)
    configs.push(test({ rules: userRules.vitest }))

  return {
    extends: [
      ...configs,
      ...userExtends,
    ],
    overrides: [
      ...overrides,
      ...userOverrides,
    ],
    rules: userRules.custom,
    ignorePatterns: ignore(ignores),
    options: {
      typeAware: ts,
      typeCheck: ts,
      ...userOptions,
    },
    categories: userCategories,
    env: {
      builtin: true,
      es2026: true,
      ...userEnv,
    },
    ...userConfig,
  }
}
