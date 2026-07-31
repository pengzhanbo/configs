import type { OxlintConfig } from 'oxlint'

const arrayKeys: (keyof OxlintConfig)[] = [
  'overrides',
  'extends',
  'ignorePatterns',
  'plugins',
  'jsPlugins',
]
const objectKeys: (keyof OxlintConfig)[] = [
  'categories',
  'env',
  'globals',
  'options',
  'rules',
  'settings',
]

export function createConfig() {
  const configList: Record<string, any>[] = []
  const config: Record<string, any> = {}

  function mergeConfig(newConfig: Record<string, any>) {
    for (const key of Object.keys(newConfig)) {
      if (arrayKeys.includes(key as keyof OxlintConfig)) {
        config[key] ??= []
        config[key].push(...(newConfig[key] || []))
      }
      else if (objectKeys.includes(key as keyof OxlintConfig)) {
        config[key] = { ...config[key], ...newConfig[key] }
      }
      else {
        config[key] = newConfig[key]
      }
    }
  }

  return {
    addConfig: (newConfig: OxlintConfig): void => void configList.push(newConfig),
    getConfig: (): Record<string, any> => {
      configList.forEach(config => mergeConfig(config))
      return config
    },
  }
}
