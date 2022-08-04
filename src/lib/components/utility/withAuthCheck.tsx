import { NextComponentType, NextPageContext } from 'next'
import { Loading } from './loading/Loading'
import { useAuth } from '../../../stores/auth'

export const withAuthCheck = (
  Component: NextComponentType<NextPageContext, any, {}>,
) => {
  const AuthCheck = (props: any) => {
    const { loading, authToken } = useAuth()

    if (loading) {
      return <Loading />
    } else if (!authToken) {
      // In this case we'll be awaiting the redirect from GuardedRoute
      return <Loading />
    } else {
      return <Component {...props} />
    }
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    AuthCheck.getInitialProps = Component.getInitialProps
  }

  return AuthCheck
}
