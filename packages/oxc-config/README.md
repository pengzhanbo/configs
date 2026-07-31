# @pengzhanbo/oxc-config

## Install

```bash
npm install @pengzhanbo/oxc-config
```

## Usage

`oxlint.config.ts`:

```ts
import config from '@pengzhanbo/oxc-config/oxlint'

export default config({
  vue: true,
  react: true
})
```

`oxfmt.config.ts`:

```ts
import config from '@pengzhanbo/oxc-config/oxfmt'

export default config
```
