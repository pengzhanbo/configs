/**
 * 检查 oxlint 规则是否完整
 *
 * 通过比对本地规则和源规则，检查是否有缺失的规则
 */

import type { OxlintConfig } from 'oxlint'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'
import { core, importRules, jsdoc, jsx, node, oxc, promise, react, test, typescript, unicorn, vue } from '../src/oxlint/configs'

const SOURCE_RULES = `https://raw.githubusercontent.com/oxc-project/website/refs/heads/main/.vitepress/data/rules.json`

const ignoreScopes: string[] = [
  // 对以下框架特定规则暂无使用场景，直接忽略
  'nextjs',
  // 以下规则不适用，直接忽略
  'jest',
]

interface SourceRule {
  scope: string
  value: string
  category: string
  version: string
  type_aware: boolean
  fix: string | boolean
  default: boolean
  docs_url: string
}

const tempFile = path.resolve(import.meta.dirname, './.temp/rules.json')

async function getSourceRules(refresh = false): Promise<SourceRule[]> {
  if (fs.existsSync(tempFile) && !refresh) {
    return JSON.parse(fs.readFileSync(tempFile, 'utf-8'))
  }
  const response = await fetch(SOURCE_RULES)
  const data = await response.json()
  fs.writeFileSync(tempFile, JSON.stringify(data))
  return data as SourceRule[]
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

function pad(text: string, length: number): string {
  return text.padEnd(length, ' ')
}

async function main() {
  const { values } = parseArgs({
    argv: process.argv.slice(2),
    options: { refresh: { type: 'boolean', default: false } },
  })

  const refresh = values.refresh

  console.log('Checking rules...', refresh ? 'with refresh' : '')
  const sourceRules = await getSourceRules(refresh)
  const localRules = getLocalRules()
  const results = diff(sourceRules, localRules)
  for (const [scope, rules] of Object.entries(results)) {
    console.log(`scope: ${scope} (${rules.length})`)
    for (const rule of rules) {
      console.log(`    ${createClickableLink(rule.value, rule.docs_url)}${
        pad(' ', 48 - rule.value.length)}  |  ${pad(rule.category, 12)}  |  ${rule.version}`)
    }
    console.log('')
    console.log('')
  }
}

main().catch(console.error)
