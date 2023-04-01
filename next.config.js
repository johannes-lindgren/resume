/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  i18n: {
    locales: ['en-US', 'sv'],
    defaultLocale: 'en-US',
  },
}

export default config
