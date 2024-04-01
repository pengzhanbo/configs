> 以下文档，适用于 `eslint-config`、`eslint-config-vue`、`eslint-config-react` 等。
> 为便于理解，采用 `eslint-config` 进行举例说明。

## 相关资源

- [@pengzhanbo/eslint-config](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config)
- [@pengzhanbo/eslint-config-vue](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-vue)
- [@pengzhanbo/eslint-config-react](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-react)
- [@pengzhanbo/eslint-config-svelte](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-svelte)
- [@pengzhanbo/eslint-config-solid](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-solid)
- [@pengzhanbo/eslint-config-astro](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-astro)
- [@pengzhanbo/prettier-config](https://github.com/pengzhanbo/configs/tree/main/packages/prettier-config)
- [@pengzhanbo/stylelint-config](https://github.com/pengzhanbo/configs/tree/main/packages/stylelint-config)

## VS Code 支持 (auto fix)

安装 [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

将以下设置添加到  `.vscode/settings.json`:

```json
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## 自定义配置

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig({
  // 启用 stylistic 格式规则
  // stylistic: true,

  // 或者自定义 stylistic 规则
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript 是自动检测的，也可以显式启用它们:
  typescript: true,

  // 禁用 jsonc 、 yaml 支持
  jsonc: false,
  yaml: false,

  // 启用 unocss 或者 tailwindcss
  unocss: true, // 需安装 @unocss/eslint-plugin
  tailwindcss: true, // 需安装 eslint-plugin-tailwindcss

  // 在Flat配置中不再支持 `.eslintignore`，请使用 `ignores` 代替
  ignores: [
    './fixtures',
    // ...globs
  ]
})
```

`eslintConfig` 工厂函数也接受任意数量的自定义配置覆盖:

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig(
  {
    // Configures for eslintConfig's config
  },

  // 从第二个参数开始，它们是ESLint平面配置
  // 可以有多个配置
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

## Rules Overrides

某些规则只能在特定的文件中启用，例如，`ts/*` 规则只能在 `.ts` 文件中启用，
而 `vue/*` 规则只能在 `.vue` 文件中启用。如果想覆盖这些规则，需要指定文件扩展名:

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config-vue'

export default eslintConfig(
  { typescript: true },
  {
    // 记住在这里指定文件glob，否则它可能会导致vue插件处理非vue文件
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  {
    // 没有 `files`, 它们是所有文件的通用规则
    rules: {
      'style/semi': ['error', 'never'],
    },
  }
)
```

## Optional Plugins

### unocss

如果有使用 [unocss](https://github.com/unocss/unocss)，
需要手动安装[@unocss/eslint-plugin](https://github.com/unocss/unocss/tree/main/packages/esling-plugin#readme) 包, 并在配置中启用 `unocss`。

### tailwindcss

如果有使用 [tailwindcss](https://github.com/tailwindlabs/tailwindcss)，需要手动安装
[eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss) 包, 并在配置中启用 `tailwindcss`。

## Optional Rules

该配置还为扩展用法提供了一些可选的插件/规则。

### `perfectionist` (sorting)

这个 [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist) 插件允许你对对象键、导入等进行排序，并带有自动修复功能。

安装了插件，但默认情况下没有启用任何规则。

建议使用 [配置注释](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) 单独选择每个文件。

```js
/* eslint perfectionist/sort-objects: "error" */
const objectWantedToSort = {
  a: 2,
  b: 1,
  c: 3,
}
/* eslint perfectionist/sort-objects: "off" */
```

## Type Aware Rules

你可以通过将 options 对象传递给 typescript 配置来选择启用 [类型感知规则](https://typescript-eslint.io/linting/typed-linting/) :

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```
