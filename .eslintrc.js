module.exports = {
  root: true,
  ignorePatterns: ['dist/**/*'],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', '@next/next', 'react'],
  rules: {
    camelcase: 'off',
    'import/order': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/self-closing-comp': ['error'],
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'none',
        semi: false
      }
    ]
  }
}
