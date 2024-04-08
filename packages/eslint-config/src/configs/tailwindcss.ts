import { isPackageExists } from 'local-pkg'
import { interopDefault } from '../utils'
import type { OptionsTailwindCSS, TypedFlatConfigItem } from '../types'

const tailwindPackages = ['eslint-plugin-tailwindcss']

export async function tailwindcss(
  options: OptionsTailwindCSS = {},
): Promise<TypedFlatConfigItem[]> {
  const { whitelist, cssFiles: cssFilesFilter, customClassNames = true } = options
  const unInstalled = tailwindPackages.filter(i => !isPackageExists(i))

  if (unInstalled.length > 0) {
    console.warn(`${unInstalled.join(', ')} is not installed, please install it first.\n Run \`npm install -D ${unInstalled.join(' ')}\``)
    return []
  }

  const [
    pluginTailwindcss,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-tailwindcss')),
  ] as const)

  const cssFiles = cssFilesFilter
    ? [...new Set([
        '**/*.css',
        '!**/node_modules',
        '!**/.*',
        '!**/dist',
        '!**/build',
        ...cssFilesFilter,
      ])]
    : undefined

  return [
    {
      name: 'config/tailwindcss/setup',
      plugins: {
        tailwindcss: pluginTailwindcss,
      },
      settings: {
        tailwindcss: {
          cssFiles,
          whitelist,
        },
      },
    },
    {
      name: 'config/tailwindcss/rules',
      rules: {
        ...pluginTailwindcss.configs.recommended.rules as any,

        ...customClassNames
          ? {
              'tailwindcss/no-custom-classname': 'off',
            }
          : {},
      },
    },
  ]
}
