import type { StylelintConfig } from './define-config'
import stylelintConfig from './config'

export * from './define-config'
export { stylelintConfig }

export default stylelintConfig() as StylelintConfig
