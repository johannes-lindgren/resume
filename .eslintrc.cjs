module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'next',
    'prettier',
    'eslint:recommended',
  ],
  plugins: [
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'off',
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      globals: {
        JSX: true,
        React: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      rules: {
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['warn', {
          args: "none",
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }],
      },
    },
    {
      files: ["*.test.ts", '*.test.tsx'],
      env: {
        jest: true,
        node: true,
      }
    }
  ],
}
