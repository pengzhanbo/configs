import type { DummyRuleMap, OxlintConfig, OxlintOverride } from 'oxlint'

export { defineConfig } from 'oxlint'

export function defineOverride(override: OxlintOverride): OxlintConfig {
  return {
    overrides: [override],
  }
}

export function defineRules(rules: DummyRuleMap): DummyRuleMap {
  return rules
}

export type SplitRules = Record<string, DummyRuleMap>

const ruleNames: string[] = [
  // builtin
  'import',
  // 'jest', // 忽略 jest 规则
  'jsdoc',
  'jsx-a11y',
  // 'nextjs', // 忽略 nextjs 规则
  'node',
  'oxc',
  'promise',
  'react',
  'react-perf',
  'typescript',
  'unicorn',
  'vitest',
  'vue',

  // compat eslint
  '@stylistic',
  'regexp',
]

export function splitRules(rules: DummyRuleMap): SplitRules {
  const result: SplitRules = { core: {}, custom: {} }

  for (const [name, rule] of Object.entries(rules)) {
    const index = name.indexOf('/')
    if (index === -1) {
      result.core[name] = rule
    }
    else {
      const key = name.slice(0, index)
      if (ruleNames.includes(key)) {
        result[key] ??= {}
        result[key][name] = rule
      }
      else {
        result.custom[name] = rule
      }
    }
  }

  return result
}
