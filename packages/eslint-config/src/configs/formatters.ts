import { isPackageExists } from 'local-pkg'
import { GLOB_ASTRO, GLOB_CSS, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from '../globs'
import type { VendoredPrettierOptions } from '../vender/prettier-types'
import { interopDefault, parserPlain } from '../utils'
import type { FlatConfigItem, OptionsFormatters, StylisticConfig } from '../types'
import { StylisticConfigDefaults } from './stylistic'

const formatPackages = ['eslint-plugin-format']
export async function formatters(
  options: OptionsFormatters | true = {},
  stylistic: StylisticConfig = {},
): Promise<FlatConfigItem[]> {
  const unInstalled = formatPackages.filter(i => !isPackageExists(i))

  if (unInstalled.length > 0) {
    console.warn(`${unInstalled.join(', ')} is not installed, please install it first.\n Run \`npm install -D ${unInstalled.join(' ')}\``)
    return []
  }

  if (options === true) {
    options = {
      astro: isPackageExists('astro'),
      css: true,
      graphql: true,
      html: true,
      markdown: true,
    }
  }

  const {
    indent,
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...stylistic,
  }

  const prettierOptions: VendoredPrettierOptions = Object.assign(
    {
      endOfLine: 'auto',
      semi,
      singleQuote: quotes === 'single',
      tabWidth: typeof indent === 'number' ? indent : 2,
      trailingComma: 'all',
      useTabs: indent === 'tab',
    } satisfies VendoredPrettierOptions,
    options.prettierOptions || {},
  )

  const dprintOptions = Object.assign(
    {
      indentWidth: typeof indent === 'number' ? indent : 2,
      quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
      useTabs: indent === 'tab',
    },
    options.dprintOptions || {},
  )

  const pluginFormat = await interopDefault(import('eslint-plugin-format'))

  const configs: FlatConfigItem[] = [
    {
      name: 'config:formatters:setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ]

  if (options.css) {
    configs.push(
      {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'config:formatter:css',
        rules: {
          'format/prettier': [
            'error',
            {
              ...prettierOptions,
              parser: 'css',
            },
          ],
        },
      },
      {
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'config:formatter:scss',
        rules: {
          'format/prettier': [
            'error',
            {
              ...prettierOptions,
              parser: 'scss',
            },
          ],
        },
      },
      {
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'config:formatter:less',
        rules: {
          'format/prettier': [
            'error',
            {
              ...prettierOptions,
              parser: 'less',
            },
          ],
        },
      },
    )
  }

  if (options.html) {
    configs.push({
      files: ['**/*.html'],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'config:formatter:html',
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            parser: 'html',
          },
        ],
      },
    })
  }

  if (options.markdown) {
    const formater = options.markdown === true
      ? 'prettier'
      : options.markdown

    configs.push({
      files: [GLOB_MARKDOWN],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'config:formatter:markdown',
      rules: {
        [`format/${formater}`]: [
          'error',
          formater === 'prettier'
            ? {
                printWidth: 120,
                ...prettierOptions,
                embeddedLanguageFormatting: 'off',
                parser: 'markdown',
              }
            : {
                ...dprintOptions,
                language: 'markdown',
              },
        ],
      },
    })
  }

  if (options.graphql) {
    configs.push({
      files: ['**/*.graphql'],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'config:formatter:graphql',
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            parser: 'graphql',
          },
        ],
      },
    })
  }

  if (options.astro) {
    configs.push({
      files: [GLOB_ASTRO],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'config:formatter:astro',
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            parser: 'astro',
            plugins: [
              'prettier-plugin-astro',
            ],
          },
        ],
      },
    })
  }

  return configs
}
