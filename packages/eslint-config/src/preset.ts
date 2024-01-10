import fs from 'node:fs'
import type { Awaitable, FlatConfigItem, PresetItem } from './types'
import { interopDefault } from './utils'
import {
  comments,
  formatters,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  perfectionist,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  tailwindcss,
  test,
  toml,
  typescript,
  unicorn,
  unocss,
  yaml,
} from './configs'
import { getOverrides, resolveSubOptions } from './resolveSubOptions'

export const defaultPreset: PresetItem = (options) => {
  const {
    componentExts,
    gitignore: enableGitignore,
    isInEditor,
    typescript: enableTypeScript,
    stylistic: stylisticOptions,
  } = options

  const configs: Awaitable<FlatConfigItem[]>[] = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore'))
          .then(r => [r(enableGitignore)]),
      )
    }
    else {
      if (fs.existsSync('.gitignore')) {
        configs.push(
          interopDefault(import('eslint-config-flat-gitignore'))
            .then(r => [r()]),
        )
      }
    }
  }

  // Base configs
  configs.push(
    ignores(),
    javascript({
      isInEditor,
      overrides: getOverrides(options, 'javascript'),
    }),
    comments(),
    node(),
    jsdoc({
      stylistic: stylisticOptions,
    }),
    imports({
      stylistic: stylisticOptions,
    }),
    unicorn(),

    // Optional plugins (installed but not enabled by default)
    perfectionist(),
  )

  if (enableTypeScript) {
    configs.push(typescript({
      ...resolveSubOptions(options, 'typescript'),
      componentExts,
    }))
  }

  if (stylisticOptions) {
    configs.push(stylistic({
      ...(typeof stylisticOptions === 'boolean' ? {} : stylisticOptions),
      overrides: getOverrides(options, 'stylistic'),
    }))
  }

  if (options.test) {
    configs.push(test({
      isInEditor,
      overrides: getOverrides(options, 'test'),
    }))
  }

  if (options.jsonc) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, 'jsonc'),
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    )
  }

  if (options.yaml) {
    configs.push(yaml({
      overrides: getOverrides(options, 'yaml'),
      stylistic: stylisticOptions,
    }))
  }

  if (options.toml) {
    configs.push(toml({
      overrides: getOverrides(options, 'toml'),
      stylistic: stylisticOptions,
    }))
  }

  if (options.unocss) {
    configs.push(unocss({
      ...resolveSubOptions(options, 'unocss'),
      overrides: getOverrides(options, 'unocss'),
    }))
  }

  if (options.tailwindcss) {
    configs.push(tailwindcss({
      ...resolveSubOptions(options, 'tailwindcss'),
      overrides: getOverrides(options, 'tailwindcss'),
    }))
  }

  if (options.markdown) {
    configs.push(
      markdown({
        componentExts,
        overrides: getOverrides(options, 'markdown'),
      }),
    )
  }

  if (options.formatters) {
    configs.push(formatters(
      options.formatters,
      typeof stylisticOptions === 'boolean' ? {} : stylisticOptions,
    ))
  }

  return configs
}
