import { isPackageExists } from 'local-pkg'

const TS = isPackageExists('typescript')

export default {
  extends: TS
    ? ['@pengzhanbo/eslint-config-ts']
    : ['@pengzhanbo/eslint-config-basic', 'plugin:prettier/recommended'],
}
