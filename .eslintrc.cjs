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
  globals: {
    JSX: true,
    React: true,
  },
  rules: {
    'prettier/prettier': 'warn'
  },
}
