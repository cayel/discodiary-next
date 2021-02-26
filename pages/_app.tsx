import { Provider } from 'next-auth/client'
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/main.css';

function MyApp({ Component, pageProps } : AppProps) {
  return (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
