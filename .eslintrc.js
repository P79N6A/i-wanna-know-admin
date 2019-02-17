module.exports = {
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'react/self-closing-comp': 'error',
    'react/prop-types': 'warn',
    semi: 'error',
    quotes: ['error', 'single'],
    'no-console': 'warn',
    'global-require': 'off',
    'newline-after-var': 'error',
    'newline-before-return': 'error',
    'no-use-before-define': 'error',
    'jsx-quotes': 'error',
    'array-callback-return': 'off',
  },
  globals: {
    require: true,
  },
  env: {
    es6: true,
    browser: true,
  },
};
