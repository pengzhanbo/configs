import type { DummyRuleMap, OxlintConfig } from 'oxlint'

interface VueOptions {
  rules?: DummyRuleMap
}

export function vue({ rules }: VueOptions = {}): OxlintConfig {
  return {
    plugins: ['vue'],
    rules: {
      'vue/component-definition-name-casing': 'warn',
      'vue/define-emits-declaration': 'off',
      'vue/define-props-declaration': 'off',
      'vue/define-props-destructuring': 'off',
      'vue/max-props': 'off',
      'vue/next-tick-style': 'off',
      'vue/no-arrow-functions-in-watch': 'error',
      'vue/no-async-in-computed-properties': 'error',
      'vue/no-computed-properties-in-data': 'error',
      'vue/no-deprecated-data-object-declaration': 'error',
      'vue/no-deprecated-delete-set': 'error',
      'vue/no-deprecated-destroyed-lifecycle': 'error',
      'vue/no-deprecated-events-api': 'error',
      'vue/no-deprecated-model-definition': 'error',
      'vue/no-deprecated-props-default-this': 'error',
      'vue/no-deprecated-vue-config-keycodes': 'error',
      'vue/no-dupe-keys': 'error',
      'vue/no-export-in-script-setup': 'error',
      'vue/no-expose-after-await': 'error',
      'vue/no-import-compiler-macros': 'off',
      'vue/no-lifecycle-after-await': 'error',
      'vue/no-multiple-slot-args': 'warn',
      'vue/no-required-prop-with-default': 'warn',
      'vue/no-reserved-component-names': 'error',
      'vue/no-reserved-keys': 'error',
      'vue/no-reserved-props': 'error',
      'vue/no-shared-component-data': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-this-in-before-route-enter': 'off',
      'vue/no-watch-after-await': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/require-default-export': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-direct-export': 'off',
      'vue/require-prop-type-constructor': 'error',
      'vue/require-prop-types': 'off',
      'vue/require-render-return': 'error',
      'vue/require-slots-as-functions': 'error',
      'vue/require-typed-ref': 'off',
      'vue/return-in-computed-property': 'error',
      'vue/return-in-emits-validator': 'error',
      'vue/valid-define-emits': 'error',
      'vue/valid-define-options': 'error',
      'vue/valid-define-props': 'error',
      'vue/valid-next-tick': 'error',
      ...rules,
    },
    overrides: [
      {
        plugins: ['import'],
        files: ['**/*.vue'],
        rules: {
          'import/unambiguous': 'off',
        },
      },
    ],
  }
}
