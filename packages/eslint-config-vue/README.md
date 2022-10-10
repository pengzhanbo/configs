# @pengzhanbo/eslint-config-vue

## Install

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config-vue @pengzhanbo/prettier-config
```

## Config

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo/eslint-config-vue"
}
```

**package.json**

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "prettier": "@pengzhanbo/prettier-config"
}
```
