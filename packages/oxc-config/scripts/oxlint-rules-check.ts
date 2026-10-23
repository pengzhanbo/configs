/**
 * 检查 oxlint 规则是否完整
 *
 * 从本地安装的 oxlint 的 `configuration_schema.json` 中读取全部规则，
 * 与本地配置中的规则进行比对，检查是否有缺失的规则。
 */

import type { OxlintConfig } from 'oxlint'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { core, importRules, jsdoc, jsx, node, oxc, promise, react, test, typescript, unicorn, vue } from '../src/oxlint/configs'

const require = createRequire(import.meta.url)

const ignoreScopes: string[] = [
  // 对以下框架特定规则暂无使用场景，直接忽略
  'nextjs',
  // 以下规则不适用，直接忽略
  'jest',
]

interface OxlintSchema {
  definitions: {
    DummyRuleMap: {
      properties: Record<string, unknown>
    }
  }
}

interface SourceRule {
  scope: string
  value: string
  docs_url: string
}

function resolveSchemaFile(): string {
  // `oxlint/package.json` 在 exports 中导出，可据此定位同一包内的 schema 文件
  return path.join(path.dirname(require.resolve('oxlint/package.json')), 'configuration_schema.json')
}

function getSourceRules(): SourceRule[] {
  const schema: OxlintSchema = JSON.parse(fs.readFileSync(resolveSchemaFile(), 'utf-8'))
  return Object.keys(schema.definitions.DummyRuleMap.properties).map((name) => {
    const index = name.indexOf('/')
    const scope = index === -1 ? 'eslint' : name.slice(0, index)
    const value = index === -1 ? name : name.slice(index + 1)

    return {
      scope,
      value,
      docs_url: `https://oxc.rs/docs/guide/usage/linter/rules/${scope}/${value}.html`,
    }
  })
}

function patternRules(config: OxlintConfig): Record<string, string> {
  const rules = { ...config.rules }

  if (config.overrides) {
    for (const override of config.overrides) {
      Object.assign(rules, override.rules)
    }
  }

  return rules as Record<string, string>
}

function getLocalRules(): Record<string, string> {
  const coreRules = Object.fromEntries(
    Object.entries(core().rules!).map(([key, value]) => [`eslint/${key}`, value]),
  )
  return {
    ...coreRules,
    ...patternRules(importRules()),
    ...patternRules(jsdoc()),
    ...patternRules(jsx()),
    ...patternRules(node()),
    ...patternRules(oxc()),
    ...patternRules(promise()),
    ...patternRules(react()),
    ...patternRules(test()),
    ...patternRules(typescript()),
    ...patternRules(unicorn()),
    ...patternRules(vue()),
  } as Record<string, string>
}

function diff(sourceRules: SourceRule[], localRules: Record<string, string>) {
  const results: Record<string, SourceRule[]> = {}
  for (const rule of sourceRules) {
    if (ignoreScopes.includes(rule.scope)) {
      continue
    }
    const scope = rule.scope.replaceAll('_', '-')
    if (!localRules[`${scope}/${rule.value}`]) {
      results[scope] ??= []
      results[scope].push(rule)
    }
  }
  return results
}

function createClickableLink(text: string, url: string): string {
  // OSC 8 超链接序列，使用 BEL (\x07) 作为终止符以获得更好的兼容性
  return `\x1B]8;;${url}\x07${text}\x1B]8;;\x07`
}

function main() {
  console.log('Checking rules...')
  const sourceRules = getSourceRules()
  const localRules = getLocalRules()
  const results = diff(sourceRules, localRules)

  for (const [scope, rules] of Object.entries(results)) {
    console.log(`scope: ${scope} (${rules.length})`)
    for (const rule of rules) {
      console.log(`    ${createClickableLink(rule.value, rule.docs_url)}`)
    }
    console.log('')
  }

  if (Object.keys(results).length === 0) {
    console.log('All rules are covered.')
  }
}

main()
