import type { AppProps } from 'next/app'
import { AuthProvider } from '../stores/auth'
import { GuardedRoute } from '../lib/'
import '../styles/normalize.scss'
import '../styles/globals.scss'

// Don't change this to ES6, this is from the Next docs.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GuardedRoute>
        <Component {...pageProps} />
      </GuardedRoute>
    </AuthProvider>
  )
}

export default MyApp
