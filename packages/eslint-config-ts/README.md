# @pengzhanbo/eslint-config-ts

## Install

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config-ts @pengzhanbo/prettier-config
```

## Config

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo/eslint-config-ts"
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
