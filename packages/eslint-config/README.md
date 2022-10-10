# @pengzhanbo/eslint-config

## Install

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config @pengzhanbo/prettier-config
```

## Config

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo"
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
