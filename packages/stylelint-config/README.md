# @pengzhanbo/stylelint-config

The prettier config preset.

## Usage

### Install

```
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
    "vue",
    "markdown",
    // when use  css-in-js
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  }
}
```
