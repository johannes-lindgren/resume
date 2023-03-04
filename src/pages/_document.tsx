import * as React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { lightTheme } from '@/design/lightTheme'

const MyDocument = () => (
  <Html lang="en">
    <Head>
      {/* PWA primary color */}
      <meta
        name="theme-color"
        content={lightTheme.palette.primary.main}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
