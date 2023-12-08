module.exports = {
  root: true,
  ignorePatterns: ['dist/**/*'],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@next/next', 'react', 'prettier'],
  rules: {
    camelcase: 'off',
    'import/order': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-key': ['error'],
    'react/no-array-index-key': ['error'],
    'react/self-closing-comp': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-custom-classname': 'error',
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none',
        semi: false
      }
    ]
  }
}
