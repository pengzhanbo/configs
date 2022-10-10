# @pengzhanbo/eslint-config-react

## Install

```sh
pnpm add eslint @pengzhanbo/eslint-config-react
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
  }
}
```
