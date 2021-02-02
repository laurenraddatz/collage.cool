import { AppProps } from 'next/app'
import { css, Global } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
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
