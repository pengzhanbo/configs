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
    jsxA11y: enableJsxA11y = true,
    vue: enableVue = false,
    react: enableReact = false,
    node: enableNode = true,
    rules = {},
    extends: userExtends = [],
    overrides: userOverrides = [],
    ...userConfig
  } = options

  const configs: OxlintConfig[] = []
  const userRules = splitRules(rules)

  configs.push({
    options: { typeAware: ts, typeCheck: ts },
    categories: { correctness: 'error', pedantic: 'warn', perf: 'warn', restriction: 'warn', suspicious: 'warn' },
    env: { builtin: true, es2026: true, browser: true, node: true },
  })

  configs.push(ignore(ignores))
  configs.push(core({ rules: userRules.core }))
  configs.push(importRules({ rules: userRules.import }))
  configs.push(jsdoc({ ts, rules: userRules.jsdoc }))
  configs.push(unicorn({ rules: userRules.unicorn }))
  configs.push(oxc({ rules: userRules.oxc }))
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

  configs.push(test({ rules: userRules.vitest }))

  return {
    extends: [...configs, ...userExtends],
    overrides: [...overrides, ...userOverrides],
    rules: userRules.custom,
    ...userConfig,
  }
}
