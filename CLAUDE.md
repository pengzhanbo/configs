# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for personal ESLint, Stylelint, and Prettier configurations (`@pengzhanbo/configs`). It provides preset configurations for JavaScript/TypeScript projects and framework-specific projects (Vue, React, Solid, Svelte, Astro, Angular).

## Package Structure

```sh
packages/
├── eslint-config/          # Base ESLint config (flat config)
├── eslint-config-vue/     # Vue project preset
├── eslint-config-react/   # React project preset
├── eslint-config-solid/   # SolidJS project preset
├── eslint-config-svelte/  # Svelte project preset
├── eslint-config-astro/   # Astro project preset
├── eslint-config-angular/  # Angular project preset
├── stylelint-config/      # CSS/SCSS Stylelint config
├── prettier-config/       # Prettier config (deprecated)
└── tsconfig/              # Shared TypeScript configs
```

## Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Lint all packages (stubs first, then eslint)
pnpm lint

# Run tests
pnpm test

# Build a single package
pnpm --filter @pengzhanbo/eslint-config build

# Run tests for a single package
pnpm --filter @pengzhanbo/stylelint-config test
```

## Key Architecture

### ESLint Config (`packages/eslint-config/`)

The main config uses ESLint flat config format. The factory function (`factory.ts`) composes modular configs from `src/configs/`:

- **Base configs**: `javascript`, `typescript`, `imports`, `node`, `jsdoc`, `unicorn`, `regexp`, `test`, `stylistic`
- **Framework configs**: `vue`, `react`, `solid`, `svelte`, `astro`, `angular`
- **Tool configs**: `unocss`, `tailwindcss`, `markdown`, `jsonc`, `yaml`, `toml`
- **Preset toggles**: `CONFIG_PRESET_FULL_ON` / `CONFIG_PRESET_FULL_OFF` in `config-presets.ts`

Framework-specific packages (e.g., `eslint-config-vue`) extend the base by:

1. Adding framework-specific peer dependencies
2. Re-exporting with default options pre-configured

### Stylelint Config

Located in `packages/stylelint-config/`. Supports CSS, SCSS, and TailwindCSS custom at-rules. Config is defined in `src/index.ts`.

### Catalog System

This repo uses pnpm catalogs (`pnpm-workspace.yaml`) for dependency version management:

- `dev` - development tools
- `peer` - peer dependencies that need to be installed by consumers
- `prod` - production dependencies

## VS Code Integration

ESLint and Stylelint both support auto-fix on save. See `.vscode/settings.json` patterns and `docs/eslint.md` / `docs/stylelint.md` for full VS Code configuration.

## Release Process

Releases are handled by `bumpp` via `pnpm release`. The `release.yaml` workflow publishes packages to npm.
