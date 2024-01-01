# @pengzhanbo/eslint-config

Fork for [@antfu/eslint-config](https://github.com/antfu/eslint-config).

与 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 不同的是，
将 framework 相关的配置划分为独立的 eslint 配置包。

包括 `vue` 、 `react` 等都移动到其他的 package 中，只保留 通用的配置，
再根据项目的需求引入对应的 package。 并添加了 `solid-js` , `svelte` 等的配置支持。

## Documentation

[Document](https://github.com/pengzhanbo/configs/tree/main/docs/eslint.md)

## Usage

## Install

```bash
pnpm add @pengzhanbo/eslint-config
```

## Configuration

`eslint.config.js`
```js
import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig()
```

## 相关资源
- [@pengzhanbo/eslint-config](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config)
- [@pengzhanbo/eslint-config-vue](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-vue)
- [@pengzhanbo/eslint-config-react](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-react)
- [@pengzhanbo/eslint-config-svelte](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-svelte)
- [@pengzhanbo/eslint-config-solid](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-solid)
- [@pengzhanbo/eslint-config-astro](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-astro)
- [@pengzhanbo/prettier-config](https://github.com/pengzhanbo/configs/tree/main/packages/prettier-config)
- [@pengzhanbo/stylelint-config](https://github.com/pengzhanbo/configs/tree/main/packages/stylelint-config)
