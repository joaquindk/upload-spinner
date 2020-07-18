module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'plugin:jest/recommended'
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'latest'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest'],
  rules: {}
}
