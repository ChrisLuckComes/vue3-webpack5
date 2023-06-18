module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
  ],
  customSyntax: 'postcss-html',
  plugins: ['stylelint-order'],
  rules: {
    'color-function-notation': ['legacy', { ignore: ['with-var-inside'] }],
    'alpha-value-notation': 'number',
  },
}
