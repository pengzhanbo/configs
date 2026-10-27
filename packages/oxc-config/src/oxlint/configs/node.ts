import type { OxlintConfig, OxlintOverride } from 'oxlint'
import { defineRules } from '../utils'

const nodeRules = defineRules({
  'node/callback-return': 'off',
  'node/exports-style': 'off',
  'node/global-require': 'off',
  'node/handle-callback-err': ['error', '^(err|error)$'],
  'node/no-exports-assign': 'error',
  'node/no-mixed-requires': 'off',
  'node/no-new-require': 'error',
  'node/no-path-concat': 'error',
  'node/no-process-env': 'error',
  'node/no-sync': 'off',
  'node/no-top-level-await': ['warn', { ignoreBin: true }],
})

export function node({ files, rules, env, ...options }: Partial<OxlintOverride> = {}): OxlintConfig {
  const override: OxlintOverride = {
    plugins: ['node'],
    env: { node: true },
    files: [
      '**/scripts/**/*.{js,cjs,mjs,ts,cts,mts}',
      '**/*.config.{js,cjs,mjs,ts,cts,mts}',
    ],
    rules: {
      ...nodeRules,
      'no-console': 'off',
      'node/no-process-env': 'off',
      'node/no-top-level-await': 'off',
    },
  }

  if (files?.length) {
    return {
      overrides: [{
        plugins: ['node'],
        files,
        env: { node: true, ...env },
        rules: { ...nodeRules, ...rules },
        ...options,
      }, override],
    }
  }
  return {
    plugins: ['node'],
    env: { node: true, ...env },
    rules: { ...nodeRules, ...rules },
    ...options,
    overrides: [override],
  }
}
