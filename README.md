# @pengzhanbo/configs

**eslint** 配置，且适配了 **prettier**

- javascript
- typescript
- vue
- react

**stylelint** 配置

- css
- scss
- TailwindCSS custom Rules


## Usage

### Javascript项目

适用于 大多数的 JavaScript 项目。

**Installed**

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config @pengzhanbo/prettier-config
```

**Config**

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

### Typescript项目

适用于 大多数的 TypeScript 项目。

**Installed**

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config-ts @pengzhanbo/prettier-config
```

**Config**

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

### Vue项目

适用于 Vue 但未使用 typescript 项目。

**Installed**

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config-vue @pengzhanbo/prettier-config
```

**Config**

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

### Vue-TS项目

适用于 Vue 且使用 Typescript 项目。

**Installed**

```sh
pnpm add eslint prettier @pengzhanbo/eslint-config-vue-ts @pengzhanbo/prettier-config
```

**Config**

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

### React项目

适用于 大多数的 React 项目。

**Installed**

```sh
pnpm add eslint @pengzhanbo/eslint-config-react
```

**Config**

`.eslintrc`/`.eslintrc.json`

```json
{
  "extends": "@pengzhanbo/eslint-config-react"
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

### stylelint

适用于 css / scss 场景，且适配了 TailwindCSS 的自定义 rules

**Installed**

```sh
pnpm add eslint @pengzhanbo/stylelint-config
```

In `.stylelintrc.json`

``` json
{
  "extends": "@pengzhanbo/stylelint-config"
}
```
