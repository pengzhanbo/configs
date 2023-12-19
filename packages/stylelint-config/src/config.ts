import { isPackageExists } from 'local-pkg'
import { toArray } from '@pengzhanbo/utils'
import { GLOB_EXCLUDE, JS_EXT } from './globs'
import { codeguideRules, normalRules, orderRules } from './rules'
import type { SCSSRuleOptions, StylelintConfig, StylelintRules } from './define-config'

// 待实现
const CSS_IN_JS = false

const IGNORES = !CSS_IN_JS ? JS_EXT.map(ext => `**/${ext}`) : []

interface Options {
  order?: boolean
  codeguide?: boolean
  scss?: boolean
  overrides?: {
    scss?: Partial<SCSSRuleOptions>
  }
  rules?: StylelintRules
}

function stylelintConfig(
  options: Options = {},
  userConfig: StylelintConfig = {},
): StylelintConfig {
  const { order = true, codeguide = true, scss = true, overrides = {}, rules = {} } = options
  const config = { ...userConfig }

  config.extends = ['stylelint-config-standard', 'stylelint-config-html', ...toArray(config.extends)]
  config.plugins = ['stylelint-order', 'stylelint-codeguide', ...toArray(config.plugins)]
  config.ignoreFiles = [...GLOB_EXCLUDE, ...IGNORES, ...toArray(config.ignoreFiles)]
  config.overrides = config.overrides ?? []
  config.rules = { ...normalRules, ...(config.rules || {}) }

  if (order) {
    ; (config.plugins as string[]).push('stylelint-order')
    config.rules = {
      ...config.rules,
      ...orderRules,
    }
  }

  if (codeguide) {
    ; (config.plugins as string[]).push('stylelint-codeguide')
    config.rules = {
      ...config.rules,
      ...codeguideRules,
    }
  }

  if (isPackageExists('sass') && scss) {
    config.overrides?.push({
      files: ['*.scss', '**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
      rules: overrides.scss,
    })
  }

  if (rules) {
    config.rules = {
      ...config.rules,
      ...rules,
    }
  }

  return config
}

export default stylelintConfig