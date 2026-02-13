# @pengzhanbo/stylelint-config

The stylelint config preset.

## Usage

### Install

```sh
pnpm add -D @pengzhanbo/stylelint-config
```

### Config

In `.stylelintrc.json`

``` json
{
  "extends": "@pengzhanbo/stylelint-config"
}
```

## vs Code support (auto fix)

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": [
    "css",
    "scss",
    "postcss",
    // optional
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  }
}
```

## 相关资源

- [@pengzhanbo/eslint-config](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config)
- [@pengzhanbo/eslint-config-vue](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-vue)
- [@pengzhanbo/eslint-config-react](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-react)
- [@pengzhanbo/eslint-config-svelte](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-svelte)
- [@pengzhanbo/eslint-config-solid](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-solid)
- [@pengzhanbo/eslint-config-angular](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-angular)
- [@pengzhanbo/eslint-config-astro](https://github.com/pengzhanbo/configs/tree/main/packages/eslint-config-astro)
- [@pengzhanbo/prettier-config](https://github.com/pengzhanbo/configs/tree/main/packages/prettier-config)
- [@pengzhanbo/stylelint-config](https://github.com/pengzhanbo/configs/tree/main/packages/stylelint-config)
- [@pengzhanbo/tsconfig](https://github.com/pengzhanbo/configs/tree/main/packages/tsconfig)
