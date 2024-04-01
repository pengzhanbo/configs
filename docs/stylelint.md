# Stylelint

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
