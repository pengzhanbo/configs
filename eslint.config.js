import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig({
  ignores: ['fixtures', '_fixtures'],
  rules: {
    'antfu/no-import-dist': 'off',
  },
})
