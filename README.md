# @pengzhanbo/eslint-config

一份个人在使用的 **eslint** 配置。

## Usage

### Install

```sh
pnpm add eslint @pengzhanbo/eslint-config
```

### Config

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo"
}
```

### package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```
