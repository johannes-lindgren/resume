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
        rel="shortcut icon"
        href="/public/favicon.ico"
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
