import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>collage.cool</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Global
        styles={css`
          body: {
            margin: 0;
            display: block;
          }
        `}
      />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
