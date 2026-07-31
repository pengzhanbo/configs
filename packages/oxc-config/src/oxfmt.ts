import type { OxfmtConfig } from 'oxfmt'

export const oxfmtConfig: OxfmtConfig = {
  // 是否将箭头函数的唯一参数用括号括起来
  arrowParens: 'always',
  // 将多行HTML（HTML、JSX、Vue、Angular）元素的 `>` 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）
  bracketSameLine: false,
  // 在对象字面量的括号之间添加空格
  bracketSpacing: true,
  // 自动格式化文件中的嵌入部分（例如，CSS-in-JS 或 JS-in-Vue 等）。
  embeddedLanguageFormatting: 'auto',
  // 指定 HTML、Vue、Angular 和 Handlebars 的全局空白敏感度。
  htmlWhitespaceSensitivity: 'css',
  // 忽略匹配文件, glob 模式
  ignorePatterns: ['dist/', 'coverage/'],
  // 启用 JSDoc 注释格式化。
  jsdoc: false,
  // 在JSX中使用单引号代替双引号
  jsxSingleQuote: false,
  // 如何折行对象字面量，当它们可以放在一行或跨越多行时
  objectWrap: 'preserve',
  // 如何换行文本，当它们可以放在一行或跨越多行时
  proseWrap: 'preserve',
  // 更改对象中属性被引用时的行为
  quoteProps: 'consistent',
  // 在语句末尾打印分号
  semi: false,
  // 在HTML、Vue 和 JSX 中强制每个属性单独占一行
  singleAttributePerLine: false,
  // 使用单引号代替双引号
  singleQuote: true,
  // 排序导入语句
  sortImports: {
    groups: [
      'type-import',
      ['type-builtin', 'type-external', 'type-internal'],
      ['type-parent', 'type-sibling', 'type-index'],
      'value-builtin',
      'value-external',
      'value-internal',
      ['value-parent', 'value-sibling', 'value-index'],
      'unknown',
      'style',
    ],
    newlinesBetween: false,
  },
  // 对 `package.json` 的键进行排序
  sortPackageJson: { sortScripts: false },
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 用制表符缩进行，而不是空格。
  useTabs: false,
  // 在多行逗号分隔的语法结构中，尽可能打印尾部逗号
  trailingComma: 'all',
  // 是否缩进 Vue 文件中 `<script>` 和 `<style>` 标签内的代码。
  vueIndentScriptAndStyle: false,
}

export default oxfmtConfig
