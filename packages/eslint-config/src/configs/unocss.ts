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
    console.warn(`${unInstalled.join(', ')} is not installed, please install it first.\n Run \`npm install -D ${unInstalled.join(' ')}\``)
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
