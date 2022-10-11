const config = require('./typescript')
module.exports = {
  extends: [
    '@pengzhanbo/eslint-config-basic',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: ['*.tsx'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  ...config,
}
