import type { OptionsFormatters, StylisticConfig, TypedFlatConfigItem } from '../types'
import type { VendoredPrettierOptions, VendoredPrettierRuleOptions } from '../vender/prettier-types'

import { GLOB_ASTRO, GLOB_ASTRO_TS, GLOB_CSS, GLOB_GRAPHQL, GLOB_HTML, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS, GLOB_SVG, GLOB_XML } from '../globs'
import { ensurePackages, interopDefault, isPackageInScope, parserPlain } from '../utils'
import { StylisticConfigDefaults } from './stylistic'

function mergePrettierOptions(
  options: VendoredPrettierOptions,
  overrides: VendoredPrettierRuleOptions,
): VendoredPrettierRuleOptions {
  return {
    ...options,
    ...overrides,
    plugins: [
      ...(overrides.plugins || []),
      ...(options.plugins || []),
    ],
  }
}

function buildCssConfigs(prettierOptions: VendoredPrettierOptions): TypedFlatConfigItem[] {
  return ([
    [[GLOB_CSS, GLOB_POSTCSS], 'css', 'config/formatter/css'],
    [[GLOB_SCSS], 'scss', 'config/formatter/scss'],
    [[GLOB_LESS], 'less', 'config/formatter/less'],
  ] as const).map(([files, parser, name]) => ({
    files: [...files],
    languageOptions: {
      parser: parserPlain,
    },
    name,
    rules: {
      'format/prettier': [
        'error',
        mergePrettierOptions(prettierOptions, { parser }),
      ],
    },
  }))
}

function buildXmlLikeConfig(
  prettierOptions: VendoredPrettierOptions,
  prettierXmlOptions: VendoredPrettierOptions,
  files: string[],
  name: string,
): TypedFlatConfigItem {
  return {
    files,
    languageOptions: {
      parser: parserPlain,
    },
    name,
    rules: {
      'format/prettier': [
        'error',
        mergePrettierOptions({ ...prettierXmlOptions, ...prettierOptions }, {
          parser: 'xml',
          plugins: [
            '@prettier/plugin-xml',
          ],
        }),
      ],
    },
  }
}

function buildMarkdownConfigs(
  options: OptionsFormatters,
  prettierOptions: VendoredPrettierOptions,
  dprintOptions: Record<string, unknown>,
): TypedFlatConfigItem[] {
  const formater = options.markdown === true
    ? 'prettier'
    : options.markdown

  const configs: TypedFlatConfigItem[] = [
    {
      files: [GLOB_MARKDOWN],
      ignores: [],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'config/formatter/markdown',
      rules: {
        [`format/${formater}`]: [
          'error',
          formater === 'prettier'
            ? mergePrettierOptions(prettierOptions, {
                embeddedLanguageFormatting: 'off',
                parser: 'markdown',
              })
            : {
                ...dprintOptions,
                language: 'markdown',
              },
        ],
      },
    },
  ]

  return configs
}

function buildAstroConfigs(prettierOptions: VendoredPrettierOptions): TypedFlatConfigItem[] {
  return [
    {
      files: [GLOB_ASTRO],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'config/formatter/astro',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, {
            parser: 'astro',
            plugins: [
              'prettier-plugin-astro',
            ],
          }),
        ],
      },
    },
    {
      files: [GLOB_ASTRO, GLOB_ASTRO_TS],
      name: 'config/formatter/astro/disables',
      rules: {
        'style/arrow-parens': 'off',
        'style/block-spacing': 'off',
        'style/comma-dangle': 'off',
        'style/indent': 'off',
        'style/no-multi-spaces': 'off',
        'style/quotes': 'off',
        'style/semi': 'off',
      },
    },
  ]
}

function resolveFormattersOptions(options: OptionsFormatters | true): OptionsFormatters {
  if (options !== true)
    return options

  const isPrettierPluginXmlInScope = isPackageInScope('@prettier/plugin-xml')
  return {
    astro: isPackageInScope('prettier-plugin-astro'),
    css: true,
    graphql: true,
    html: true,
    markdown: true,
    svg: isPrettierPluginXmlInScope,
    xml: isPrettierPluginXmlInScope,
  }
}

function buildHtmlConfig(prettierOptions: VendoredPrettierOptions): TypedFlatConfigItem {
  return {
    files: [GLOB_HTML],
    languageOptions: {
      parser: parserPlain,
    },
    name: 'config/formatter/html',
    rules: {
      'format/prettier': [
        'error',
        mergePrettierOptions(prettierOptions, {
          parser: 'html',
        }),
      ],
    },
  }
}

function buildGraphqlConfig(prettierOptions: VendoredPrettierOptions): TypedFlatConfigItem {
  return {
    files: [GLOB_GRAPHQL],
    languageOptions: {
      parser: parserPlain,
    },
    name: 'config/formatter/graphql',
    rules: {
      'format/prettier': [
        'error',
        mergePrettierOptions(prettierOptions, {
          parser: 'graphql',
        }),
      ],
    },
  }
}

function getFormattersPackagesToEnsure(options: OptionsFormatters): (string | undefined)[] {
  return [
    'eslint-plugin-format',
    options.astro ? 'prettier-plugin-astro' : undefined,
    (options.xml || options.svg) ? '@prettier/plugin-xml' : undefined,
  ]
}

export async function formatters(
  rawOptions: OptionsFormatters | true = {},
  stylistic: StylisticConfig = {},
): Promise<TypedFlatConfigItem[]> {
  const options = resolveFormattersOptions(rawOptions)

  await ensurePackages(getFormattersPackagesToEnsure(options))

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
      printWidth: 120,
      semi,
      singleQuote: quotes === 'single',
      tabWidth: typeof indent === 'number' ? indent : 2,
      trailingComma: 'all',
      useTabs: indent === 'tab',
    } satisfies VendoredPrettierOptions,
    options.prettierOptions || {},
  )

  const prettierXmlOptions: VendoredPrettierOptions = {
    xmlQuoteAttributes: 'double',
    xmlSelfClosingSpace: true,
    xmlSortAttributesByKey: false,
    xmlWhitespaceSensitivity: 'ignore',
  }

  const dprintOptions = {
    indentWidth: typeof indent === 'number' ? indent : 2,
    quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
    useTabs: indent === 'tab',
    // TODO: refine the type of `options.dprintOptions` in the future to avoid this ts comment.
    // @ts-expect-error - `options.dprintOptions` is boolean
    // oxlint-disable-next-line unicorn/no-useless-fallback-in-spread
    ...options.dprintOptions || {},
  }

  const pluginFormat = await interopDefault(import('eslint-plugin-format'))

  const configs: TypedFlatConfigItem[] = [
    {
      name: 'config/formatter/setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ]

  if (options.css)
    configs.push(...buildCssConfigs(prettierOptions))

  if (options.html)
    configs.push(buildHtmlConfig(prettierOptions))

  if (options.xml)
    configs.push(buildXmlLikeConfig(prettierOptions, prettierXmlOptions, [GLOB_XML], 'config/formatter/xml'))

  if (options.svg)
    configs.push(buildXmlLikeConfig(prettierOptions, prettierXmlOptions, [GLOB_SVG], 'config/formatter/svg'))

  if (options.markdown)
    configs.push(...buildMarkdownConfigs(options, prettierOptions, dprintOptions))

  if (options.astro)
    configs.push(...buildAstroConfigs(prettierOptions))

  if (options.graphql)
    configs.push(buildGraphqlConfig(prettierOptions))

  return configs
}
