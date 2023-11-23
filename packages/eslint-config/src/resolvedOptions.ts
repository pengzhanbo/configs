import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import type { FlatConfigItem, OptionsConfig, StylisticConfig } from './types'

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

export function resolveOptions(options: OptionsConfig & FlatConfigItem = {}): Required<OptionsConfig> & FlatConfigItem & { stylistic: false | StylisticConfig } {
  const {
    componentExts = [],
    preset = [],
    gitignore = true,
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    overrides = {},
    typescript = isPackageExists('typescript'),
    jsx = true,
    test = true,
    jsonc = true,
    yaml = true,
    markdown = true,
  } = options

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}
  if (stylisticOptions && !('jsx' in stylisticOptions))
    stylisticOptions.jsx = options.jsx ?? true

  const enableVue = VuePackages.some(i => isPackageExists(i))

  if (enableVue)
    componentExts.push('vue')

  return {
    ...options,
    componentExts,
    preset,
    gitignore,
    isInEditor,
    overrides,
    typescript,
    stylistic: stylisticOptions,
    jsx,
    test,
    jsonc,
    yaml,
    markdown,
  }
}
