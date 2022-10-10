# @pengzhanbo/eslint-config-vue-ts

## Install

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config-vue-ts @pengzhanbo/prettier-config
```

## Config

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo/eslint-config-vue-ts"
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
