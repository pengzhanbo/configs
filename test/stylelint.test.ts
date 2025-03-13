import fs from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import { afterAll, beforeAll, it } from 'vitest'

const FIXTURES = 'fixtures/stylelint'
const _FIXTURES = '_fixtures/stylelint'

beforeAll(async () => {
  await fs.rm(_FIXTURES, { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm(_FIXTURES, { recursive: true, force: true })
})

it.concurrent('stylelint', async ({ expect }) => {
  const from = resolve(FIXTURES, 'input')
  const output = resolve(FIXTURES, 'output')
  const target = resolve(_FIXTURES)

  await fs.cp(from, target, {
    filter: (src) => {
      return !src.includes('node_modules')
    },
  })

  await fs.writeFile(join(target, 'stylelint.config.js'), `
// @eslint-disable
import config from '@pengzhanbo/stylelint-config'

export default config
  `)

  await execa(
    'npx',
    ['stylelint', '**/*.{css,scss,vue}', '--fix'],
    { cwd: target, stdio: 'pipe' },
  )

  const files = await fg('**/*', {
    ignore: [
      'node_modules',
      'stylelint.config.js',
    ],
    cwd: target,
  })

  await Promise.all(files.map(async (file) => {
    const content = await fs.readFile(join(target, file), 'utf-8')
    const source = await fs.readFile(join(from, file), 'utf-8')
    const outputPath = join(output, file)
    if (content === source) {
      fs.rm(outputPath)
      return
    }
    await expect.soft(content).toMatchFileSnapshot(join(output, file))
  }))
}, 30_000)
