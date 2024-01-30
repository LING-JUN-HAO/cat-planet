module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'standard'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.js',
        '.eslintrc.cjs'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // Add any additional rules or overrides here
  }
}
