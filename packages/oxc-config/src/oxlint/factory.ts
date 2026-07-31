import type { OxlintConfig, OxlintOverride } from 'oxlint'

import { basic } from './configs/basic'
import { ignores } from './configs/ignores'
import { jsdoc } from './configs/jsdoc'
import { jsx } from './configs/jsx'
import { node } from './configs/node'
import { react } from './configs/react'
import { regexp } from './configs/regexp'
import { stylistic } from './configs/stylistic'
import { test } from './configs/test'
import { typescript } from './configs/typescript'
import { unicorn } from './configs/unicorn'
import { vue } from './configs/vue'
import { createConfig } from './utils'

export interface Options extends Omit<OxlintConfig, 'ignorePatterns'> {
  ignores?: string[]
  typescript?: boolean
  stylistic?: boolean
  regexp?: boolean
  jsxA11y?: boolean
  vue?: boolean
  react?: boolean
}

export function oxlintConfig(
  {
    ignores: ignorePatterns,
    typescript: enableTypescript = true,
    stylistic: enableStylistic = true,
    regexp: enableRegexp = true,
    jsxA11y: enableJsxA11y = true,
    vue: enableVue = false,
    react: enableReact = false,
    ...userConfig
  }: Options = {},
  ...overrides: OxlintOverride[]
): OxlintConfig {
  const config = createConfig()

  config.addConfig({
    options: { typeAware: enableTypescript },
    categories: { correctness: 'off' },
    env: { builtin: true, es2026: true, browser: true, node: true },
  })
  config.addConfig(ignores(ignorePatterns))
  config.addConfig(basic())
  config.addConfig(jsdoc())
  config.addConfig(unicorn())

  config.addConfig(node())

  if (enableStylistic) {
    config.addConfig(stylistic())
  }

  if (enableTypescript) {
    config.addConfig(typescript())
  }

  if (enableRegexp) {
    config.addConfig(regexp())
  }

  if (enableJsxA11y) {
    config.addConfig(jsx())
  }

  if (enableVue) {
    config.addConfig(vue())
  }

  if (enableReact) {
    config.addConfig(react())
  }

  config.addConfig(test())

  config.addConfig(userConfig)
  config.addConfig({ overrides })

  return config.getConfig()
}
