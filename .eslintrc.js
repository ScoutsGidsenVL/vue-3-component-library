module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'prettier', '@vue/typescript'],
  rules: {
    'vue/no-multiple-template-root': 0,
  },
  plugins: ['vue'],
}
