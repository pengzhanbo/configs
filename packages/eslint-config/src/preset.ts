import fs from 'node:fs'
import type { Awaitable, FlatConfigItem, PresetItem } from './types'
import { interopDefault } from './utils'
import {
  comments,
  html,
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
  typescript,
  unicorn,
  unocss,
  yaml,
} from './configs'

export const defaultPreset: PresetItem = (options) => {
  const {
    componentExts,
    gitignore: enableGitignore,
    isInEditor,
    overrides,
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
      overrides: overrides.javascript,
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
      ...typeof enableTypeScript !== 'boolean'
        ? enableTypeScript
        : {},
      componentExts,
      overrides: overrides.typescript,
    }))
  }

  if (stylisticOptions)
    configs.push(stylistic(stylisticOptions))

  if (options.test) {
    configs.push(test({
      isInEditor,
      overrides: overrides.test,
    }))
  }

  if (options.jsonc) {
    configs.push(
      jsonc({
        overrides: overrides.jsonc,
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    )
  }

  if (options.html) {
    configs.push(html({
      overrides: overrides.html,
      stylistic: stylisticOptions,
    }))
  }

  if (options.yaml) {
    configs.push(yaml({
      overrides: overrides.yaml,
      stylistic: stylisticOptions,
    }))
  }

  if (options.unocss)
    configs.push(unocss(options.unocss === true ? {} : options.unocss))

  if (options.tailwindcss)
    configs.push(tailwindcss(options.tailwindcss === true ? {} : options.tailwindcss))

  if (options.markdown) {
    configs.push(markdown({
      componentExts,
      overrides: overrides.markdown,
    }))
  }

  return configs
}
