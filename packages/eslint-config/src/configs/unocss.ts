import { isPackageExists } from 'local-pkg'
import { interopDefault } from '../utils'
import type { FlatConfigItem, OptionsUnoCSS } from '../types'

const unocssPackages = ['@unocss/eslint-plugin']

export async function unocss(
  options: OptionsUnoCSS = {},
): Promise<FlatConfigItem[]> {
  const {
    attributify = true,
    strict = false,
  } = options

  const unInstalled = unocssPackages.filter(i => !isPackageExists(i))

  if (unInstalled.length > 0) {
    const installed = unInstalled.join(', ')
    console.warn(`${installed} is not installed, please install it first.`)
    return []
  }

  const [
    pluginUnoCSS,
  ] = await Promise.all([
    interopDefault(import('@unocss/eslint-plugin')),
  ] as const)

  return [
    {
      name: 'config:unocss',
      plugins: {
        unocss: pluginUnoCSS,
      },
      rules: {
        'unocss/order': 'warn',
        ...attributify
          ? {
              'unocss/order-attributify': 'warn',
            }
          : {},
        ...strict
          ? {
              'unocss/blocklist': 'error',
            }
          : {},
      },
    },
  ]
}
