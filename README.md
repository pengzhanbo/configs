# @pengzhanbo/configs

个人用的 ESLint、Stylelint、Prettier 配置库，支持 JavaScript/TypeScript 项目及多种框架。

## Packages

| Package                 | Description                     |
| ----------------------- | ------------------------------- |
| `eslint-config`         | 基础 ESLint 配置（flat config） |
| `eslint-config-vue`     | Vue 项目预设                    |
| `eslint-config-react`   | React 项目预设                  |
| `eslint-config-solid`   | SolidJS 项目预设                |
| `eslint-config-svelte`  | Svelte 项目预设                 |
| `eslint-config-astro`   | Astro 项目预设                  |
| `eslint-config-angular` | Angular 项目预设                |
| `stylelint-config`      | CSS/SCSS 配置，支持 TailwindCSS |
| `prettier-config`       | Prettier 配置（已废弃）         |
| `tsconfig`              | 共享 TypeScript 配置            |

## Quick Start

### JavaScript / TypeScript 项目

```bash
pnpm add -D eslint @pengzhanbo/eslint-config
```

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig()
```

### Vue 项目

```bash
pnpm add -D eslint @pengzhanbo/eslint-config-vue
```

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config-vue'

export default eslintConfig()
```

### React 项目

```bash
pnpm add -D eslint @pengzhanbo/eslint-config-react
```

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config-react'

export default eslintConfig()
```

### Solid 项目

```bash
pnpm add -D eslint @pengzhanbo/eslint-config-solid
```

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config-solid'

export default eslintConfig()
```

### Svelte 项目

```bash
pnpm add -D eslint @pengzhanbo/eslint-config-svelte
```

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config-svelte'

export default eslintConfig()
```

### Astro 项目

```bash
pnpm add -D eslint @pengzhanbo/eslint-config-astro
```

```js
// eslint.config.js
import eslintConfig from '@pengzhanbo/eslint-config-astro'

export default eslintConfig()
```

### Stylelint

```bash
pnpm add -D stylelint @pengzhanbo/stylelint-config
```

```json
// .stylelintrc.json
{
  "extends": "@pengzhanbo/stylelint-config"
}
```

## 配置选项

`eslintConfig()` 接受一个选项对象来定制配置：

```js
export default eslintConfig({
  // 禁用 stylistic 格式规则
  // stylistic: false,

  // 自定义 stylistic 规则
  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  // 显式启用 TypeScript
  // typescript: true,

  // 启用类型感知规则（需要 tsconfig.json）
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },

  // 禁用部分配置
  jsonc: false,
  yaml: false,
  test: false,

  // 启用 UnoCSS / TailwindCSS 支持
  unocss: true,
  tailwindcss: true,

  // 扩展忽略文件
  ignores: ['fixtures/**'],
})
```

### 完整配置选项

| 选项                | 类型                   | 默认值  | 说明                        |
| ------------------- | ---------------------- | ------- | --------------------------- |
| `gitignore`         | `boolean \| object`    | `true`  | 支持 gitignore              |
| `ignores`           | `string[] \| function` | `[]`    | 额外忽略的文件              |
| `javascript`        | `boolean \| object`    | `true`  | JavaScript 基础规则         |
| `node`              | `boolean`              | `true`  | Node.js 规则                |
| `typescript`        | `boolean \| object`    | `auto`  | TypeScript 支持（自动检测） |
| `jsx`               | `boolean \| object`    | `true`  | JSX 规则                    |
| `imports`           | `boolean \| object`    | `true`  | import 排序规则             |
| `jsdoc`             | `boolean`              | `true`  | JSDoc 规则                  |
| `unicorn`           | `boolean \| object`    | `true`  | Unicorn 规则                |
| `stylistic`         | `boolean \| object`    | `true`  | 格式风格规则                |
| `test`              | `boolean \| object`    | `true`  | Vitest 测试规则             |
| `regexp`            | `boolean \| object`    | `true`  | 正则表达式规则              |
| `jsonc`             | `boolean \| object`    | `true`  | JSONC 支持                  |
| `yaml`              | `boolean \| object`    | `true`  | YAML 支持                   |
| `toml`              | `boolean \| object`    | `true`  | TOML 支持                   |
| `markdown`          | `boolean \| object`    | `true`  | Markdown 支持               |
| `vue`               | `boolean \| object`    | `auto`  | Vue 支持（自动检测）        |
| `react`             | `boolean \| object`    | `false` | React 支持                  |
| `solid`             | `boolean \| object`    | `false` | SolidJS 支持                |
| `svelte`            | `boolean \| object`    | `false` | Svelte 支持                 |
| `astro`             | `boolean \| object`    | `false` | Astro 支持                  |
| `angular`           | `boolean \| object`    | `false` | Angular 支持                |
| `nextjs`            | `boolean \| object`    | `false` | Next.js 支持                |
| `unocss`            | `boolean \| object`    | `false` | UnoCSS 支持                 |
| `tailwindcss`       | `boolean \| object`    | `false` | TailwindCSS 支持            |
| `pnpm`              | `boolean \| object`    | `auto`  | pnpm workspace 支持         |
| `formatters`        | `boolean \| object`    | `false` | 启用代码格式化              |
| `lessOpinionated`   | `boolean`              | `false` | 禁用部分opinionated规则     |
| `type`              | `'app' \| 'lib'`       | `'app'` | 项目类型，`lib` 更严格      |
| `autoRenamePlugins` | `boolean`              | `true`  | 自动重命名插件              |

### 框架预设包的区别

框架预设包（如 `eslint-config-vue`）与基础包的区别在于：

1. **预置框架选项**：`eslint-config-vue` 默认 `vue: true`
2. **内置 peer 依赖**：已包含 `eslint-plugin-vue`、`vue-eslint-parser` 等
3. **简化使用**：开箱即用，无需手动配置框架选项

## Rules Overrides

某些规则只能在特定文件中启用，如 `ts/*` 只能在 `.ts` 文件中：

```js
export default eslintConfig(
  { typescript: true },
  {
    // 指定文件 glob
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  {
    // 无 files，表示全局规则
    rules: {
      'style/semi': ['error', 'never'],
    },
  },
)
```

## 可选插件

以下插件需要手动安装并启用：

### UnoCSS

```bash
pnpm add -D @unocss/eslint-plugin
```

```js
export default eslintConfig({
  unocss: true,
})
```

### TailwindCSS

```bash
pnpm add -D eslint-plugin-tailwindcss
```

```js
export default eslintConfig({
  tailwindcss: true,
})
```

## Stylelint 配置选项

```json
{
  "extends": "@pengzhanbo/stylelint-config",
  "rules": {
    // 自定义规则
  }
}
```

或使用 JavaScript 配置：

```js
// stylelint.config.js
import stylelintConfig from '@pengzhanbo/stylelint-config'

export default stylelintConfig({
  order: true, // 属性排序
  stylistic: true, // 格式风格
  scss: true, // SCSS 支持
})
```

## VS Code 配置

### ESLint

安装 [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，添加至 `.vscode/settings.json`：

```json
{
  "eslint.experimental.useFlatConfig": true,
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" }
  ],
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

### Stylelint

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": ["css", "scss", "postcss"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  }
}
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 代码检查
pnpm lint

# 运行测试
pnpm test
```

## 架构说明

### ESLint Config

核心在 `packages/eslint-config/src/factory.ts`，通过 `FlatConfigComposer` 组合模块化配置：

- **基础配置**：`javascript`、`typescript`、`imports`、`node`、`jsdoc`、`unicorn`、`regexp`、`test`、`stylistic`
- **框架配置**：`vue`、`react`、`solid`、`svelte`、`astro`、`angular`
- **工具配置**：`unocss`、`tailwindcss`、`markdown`、`jsonc`、`yaml`、`toml`
- **格式配置**：`formatters`（需要安装 `eslint-plugin-format`）

插件自动重命名：

- `@eslint-react` → `react`
- `@typescript-eslint` → `ts`
- `@stylistic` → `style`
- `vitest` → `test`
- `yml` → `yaml`

### Stylelint Config

`packages/stylelint-config/` 基于 `stylelint-config-standard` 和 `stylelint-config-standard-scss`，集成：

- `stylelint-order` - 属性排序
- `@stylistic/stylelint-plugin` - 格式风格

## Thanks

- [eslint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

<!--9.0.0-->
