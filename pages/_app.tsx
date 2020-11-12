import { AppProps } from 'next/app'
import { Global, css } from '@emotion/core'

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
      <Component {...pageProps} />
    </>
  )
}

export default App
