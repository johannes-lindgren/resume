module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'next',
    'prettier',
    'eslint:recommended',
  ],
  globals: {
    JSX: true,
    React: true,
  },
  plugins: [
    'prettier',
  ],
  parser: '@typescript-eslint/parser',overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
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
      files: ["*.test.ts"],
      env: {
        jest: true,
        node: true,
      }
    }
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'off',
  },
}
