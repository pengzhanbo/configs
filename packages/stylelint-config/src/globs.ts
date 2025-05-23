export const JS_EXT: string[] = [
  '*.js',
  '*.ts',
  '*.jsx',
  '*.tsx',
  '*.mjs',
  '*.cjs',
  '*.mts',
  '*.cts',
]

export const GLOB_EXCLUDE: string[] = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
  '**/node_modules/**',
  '**/*.d.ts',
  'LICENSE*',
  '**/public',
  '**/out',
  '**/*.png',
  '**/*.ico',
  '**/*.toml',
  '**/*.patch',
  '**/*.txt',
  '**/*.crt',
  '**/*.key',
  '**/*Dockerfile',
]
