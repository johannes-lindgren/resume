import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightTheme } from '@/design/lightTheme'
import { useResumeApp } from '@/hooks/useThrottledState'
import { ResumeAppProps } from '@/pages/index'

const MyApp = ({ Component, pageProps }: AppProps<ResumeAppProps>) => {
  const [state, actions] = useResumeApp(1500)

  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        <title>Brilliant Resume</title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <Component
        {...pageProps}
        state={state}
        actions={actions}
      />
    </ThemeProvider>
  )
}

export default MyApp
