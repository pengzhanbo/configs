# @pengzhanbo/eslint-config-basic

## Install

```sh
pnpm add eslint @pengzhanbo/eslint-config-basic
```

## Config

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo/eslint-config-basic"
}
```

**package.json**

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```
