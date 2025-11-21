# @pengzhanbo/tsconfig

The tsconfig preset.

## Usage

### Install

```sh
pnpm add -D @pengzhanbo/tsconfig
```

### Config

In `tsconfig.json`

```json
{
  "extends": "@pengzhanbo/tsconfig/tsconfig.json"
}
```

```json
{
  "extends": [
    "@pengzhanbo/tsconfig/tsconfig.json",
    "@pengzhanbo/tsconfig/tsconfig.lib.json"
  ]
}
```

```json
{
  "extends": "@pengzhanbo/tsconfig/tsconfig.vue.json"
}
```
