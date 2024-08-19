# @pengzhanbo/configs

一个给自己用的 eslint 、 stylelint 、 prettier 配置库。

用于个人开发的项目中。

## eslint 预设配置

- Basic
  - javascript / typescript
  - [node](https://github.com/eslint-community/eslint-plugin-n#readme)
  - [comments](https://github.com/mysticatea/eslint-plugin-eslint-comments#readme)
  - [ignores](https://github.com/antfu/eslint-config-flat-gitignore#readme)
  - [imports](https://github.com/un-es/eslint-plugin-i#readme)
    - [unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)
  - [jsdoc](https://github.com/gajus/eslint-plugin-jsdoc#readme)
  - [jsonc](https://ota-meshi.github.io/eslint-plugin-jsonc/)
  - [markdown](https://github.com/eslint/eslint-plugin-markdown#readme)
  - [perfectionist](https://eslint-plugin-perfectionist.azat.io)
  - sort
    - `package.json` / `tsconfig.json`
  - [stylistic](https://github.com/eslint-stylistic/eslint-stylistic#readme)
  - test
    - [vitest](eslint-plugin-vitest)
    - [no-only-tests](https://github.com/levibuzolic/no-only-tests#readme)
  - [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn#readme)
  - [toml](https://ota-meshi.github.io/eslint-plugin-toml/)
  - [yaml](https://ota-meshi.github.io/eslint-plugin-yml/)
  - [unocss](https://github.com/unocss/unocss/tree/main/packages/esling-plugin#readme)  - _optional, peer deps, manual install_
  - [tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)  - _optional, peer deps, manual install_
- [html](https://html-eslint.org/)
- [vue](https://eslint.vuejs.org)
- [react](https://github.com/jsx-eslint/eslint-plugin-react)
  - [react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
  - [react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh#readme)
  - [nextjs](https://github.com/vercel/next.js#readme) - _optional, auto check deps_
- [solid](https://github.com/solidjs-community/eslint-plugin-solid#readme)
- [astro](https://github.com/ota-meshi/eslint-plugin-astro)
- [svelte](https://github.com/sveltejs/eslint-plugin-svelte)

### Breaking Changes

- 从 `v1.0.0` 开始， 完全迁移至 [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)， 即只支持 `eslint.config.js` 配置文件。
- `eslint` 未来从 `9.x` 版本开始即将发生重大更新，当前仓库从`1.0.0` 开始为这些重大变更做准备。
- 抛弃了过去的所有配置进行重写。从 `1.0.0` 开始，fork 自 `@antfu/eslint-config`， 并在其基础上进行了重写，通过 `preset` 的方式来实现对通用场景、不同库/框架（vue/react/solid-js/svelte等）的支持。
  与之不同的是，`@antfu/eslint-config` 内置了包括 `vue/react`以及通用配置，通过 cli 和依赖检查来启用对 `vue/react` 的支持；而本仓库则是根据项目场景，直接安装对应的包。

## stylelint 预设配置

- css
- scss

## Usage

### Javascript / Typescript 项目

适用于 通用的 JavaScript/TypeScript 项目。

#### Install

```sh
pnpm add -D eslint @pengzhanbo/eslint-config
```

#### Config

`eslint.config.js`

```js
import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig()
```

### Vue项目

适用于 Vue 项目。

#### Install

```sh
pnpm add -D eslint @pengzhanbo/eslint-config-vue
```

#### Config

`.eslint.config.js`

```js
import eslintConfig from '@pengzhanbo/eslint-config-vue'

export default eslintConfig()
```

### React项目

适用于 React 项目。

#### Install

```sh
pnpm add -D eslint @pengzhanbo/eslint-config-react
```

#### Config

`eslint.config.js`

```js
import eslintConfig from '@pengzhanbo/eslint-config-react'

export default eslintConfig()
```

### Solid-js 项目

适用于 大多数的 Solid 项目。

#### Install

```sh
pnpm add -D eslint @pengzhanbo/eslint-config-solid
```

#### Config

`eslint.config.js`

```js
import eslintConfig from '@pengzhanbo/eslint-config-solid'

export default eslintConfig()
```

### Prettier

‼️ **~~Deprecated~~**。从 `v1.0.0` 开始，移除了 `eslint-config-prettier` ，即安装了 `eslint` 相关的配置依赖，
则不需要再使用 `prettier` 了。

除非是不想使用 `eslint` ，只想使用 `prettier`。

#### Install

```sh
pnpm add -D eslint @pengzhanbo/prettier-config
```

#### Config

`package.json`

```json
{
  "prettier": "@pengzhanbo/prettier-config"
}
```

### stylelint

适用于 css / scss 场景，且适配了 TailwindCSS 的自定义 at-rule。

#### Install

```sh
pnpm add -D eslint @pengzhanbo/stylelint-config
```

In `.stylelintrc.json`

``` json
{
  "extends": "@pengzhanbo/stylelint-config"
}
```

## Thanks

- [eslint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

<!-- 2.26.0 -->
