module.exports = {
  globals: {
    React: true,
    JSX: true,
    NodeJS: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    'react',
    'prettier',
    'simple-import-sort',
    'unused-imports',
    'import',
    'react-hooks',
  ],
  rules: {
    'no-empty': 'error',
    'no-implicit-coercion': 'off',
    'no-underscore-dangle': 'off',
    'no-var': 'warn',
    'no-continue': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-void': 'off',
    'no-console': 'off',
    'no-empty-function': 'warn',
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true,
      },
    ],
    'no-mixed-operators': [
      'error',
      {
        allowSamePrecedence: true,
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['/', '*'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||'],
        ],
      },
    ],
    'no-plusplus': [
      'warn',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    // allow for-of
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: true,
        singleQuote: true,
      },
      { usePrettierrc: true },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          [',^@?\\w', ',^\\u0000'],
          // { s }css files
          [',^.+\\.s?css$'],
          // Lib and hooks
          [',^@/lib'],
          // components
          [',^@/components'],
          // Other imports
          [',^@/'],
          [',^~/'],
          // relative paths up until 3 level
          [
            ',^\\./?$',
            ',^\\.(?!/?$)',
            ',^\\.\\./?$',
            ',^\\.\\.(?!/?$)',
            ',^\\.\\./\\.\\./?$',
            ',^\\.\\./\\.\\.(?!/?$)',
            ',^\\.\\./\\.\\./\\.\\./?$',
            ',^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          [',^@/types'],
          // other that didn't fit in
          [',^'],
        ],
      },
    ],
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],
  },
};
